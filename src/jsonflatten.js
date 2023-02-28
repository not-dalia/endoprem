/* eslint-disable no-unused-vars */
function unflattenJson(json) {
  console.log('debug')
  let arr = []
  let lastSection, lastPage, lastQuestion, lastOption
  json.forEach(el => {
    switch (el.type) {
      case 'new_section':
        arr.push([]);
        lastSection = arr[arr.length - 1]
        break;
      case 'new_page':
        lastSection.push({
          title: el.text,
          description: el.description
        })
        lastPage = lastSection[lastSection.length - 1]
        break;
      case 'new_question':        
        if (!el.sub_section_id) {
          lastPage = lastSection[lastSection.length - 1]
        }
        if (!lastPage.questions) lastPage.questions = []
        lastPage.questions.push({
          question: el.text,
          description: el.description,
          help: el.help,
          type: el.question_type,
          value: el.default_value,
          src: el.default_value,
          name: el.question_id,
          subsection: !!el.sub_section_id
        })
        lastQuestion = lastPage.questions[lastPage.questions.length - 1]
        break;
      case 'question_prompt':
        if (!lastQuestion.prompts) lastQuestion.prompts = []
        lastQuestion.prompts.push({
          prompt: el.text,
          help: el.help
        })
        break;
      case 'question_option':
        if (lastQuestion.type == 'likert-bar') {
          if (!lastQuestion.options) lastQuestion.options = {
            from: 0, to: 10
          }
          if (el.option_id == 'start') {
            lastQuestion.options.startText = el.text
          } else if (el.option_id == 'end'){
            lastQuestion.options.endText = el.text
          }
        } else {
          if (!lastQuestion.options) lastQuestion.options = []
          lastQuestion.options.push({
            name: el.text,
            description: el.description,
            help: el.help,
            id: el.option_id
          })
          lastOption = lastQuestion.options[lastQuestion.options.length - 1]
        }
        break;
      case 'option_action':
        lastOption.action = {
          onchecked: el.when_option_is,
          type: el.do_action,
          name: el.sub_section_id
        }
        break;
      case 'new_subsection':
        if (!lastPage.questions) lastPage.questions = []
        lastPage.questions.push({
          title: el.text,
          description: el.description,
          help: el.help,
          type: 'section',
          name: el.sub_section_id
        })
        lastPage = lastPage.questions[lastPage.questions.length - 1]
        break;
    }
  });

  return arr
}

function flattenJson(json) {
  let n = []
  let row;
  for (let i = 0; i < json.length; i++) {
    row = {

    }
    row.type = 'new_section'
    if (row) n.push(row)
    row = null
    let pages = json[i]
    for (let j = 0; j < pages.length; j++) {
      if (!row) row = {  }
      row.page_num = j + 1
      row.text = pages[j].title
      row.description = pages[j].description
      row.type = 'new_page'
      if (row) n.push(row)
      row = null
      pages[j].questions && pages[j].questions.forEach(q => {
        row = flattenQuestion(n, row, q, {

        })
      })
      
    }
    if (row) n.push(row)
    row = null
  }
  
  return n
}

function flattenQuestion (n, row, q, row_default) {
  if (!row) row = {
    ...row_default
  }
  
  if (q.type === 'section') {
    row.type = 'new_subsection'
    row.sub_section_id = q.name
    row.text = q.title
    row.description = q.description
    if (row) n.push(row)
    row = null
    q.questions && q.questions.forEach(qs => {
      row = flattenQuestion(n, row, qs, {
        sub_section_id: q.name,
        ...row_default
      })
    })
    if (row) n.push(row)
    row = null
    return row
  }
  
  
  row.type = 'new_question'
  row.question_id = q.name
  row.question_type = q.type
  row.description = q.description
  row.help = q.help
  row.text = q.question
  row.default_value = q.value || q.src
  if (row) n.push(row)
  row = null
  q.options && Array.isArray(q.options) && q.options.forEach((o, oi) => {
    if (!row) row = {
      question_id: q.name,
      ...row_default
    }
    row.type = 'question_option'
    row.option_id = (oi+1) * 100
    if (typeof o === 'object') {
      row.text = o.name   
      row.description = o.description
      if (row) n.push(row)
      row = null
      if (o.action) {
        if (!row) row = {
        question_id: q.name,
        option_id: (oi+1) * 100,
        ...row_default
        }
        row.type = 'option_action'
        row.when_option_is = o.action.onchecked
        row.do_action = o.action.name ? 'show_section' : o.action.type
        row.sub_section_id = o.action.name
        if (row) n.push(row)
        row = null
      }
        
    } else {
      row.text = o
      if (row) n.push(row)
      row = null
    }
  })
  
  if (q.options && !Array.isArray(q.options)) {
    if (!row) row = {
      question_id: q.name,
      ...row_default
    }
    row.type = 'question_option'
    row.option_id = 'start'
    row.text = q.options.startText
    n.push(row)
    row = null
    row = {
      question_id: q.name,
      ...row_default
    }
    row.type = 'question_option'
    row.option_id = 'end'
    row.text = q.options.endText
    n.push(row)
    row = null
  }
  
  q.prompts && Array.isArray(q.prompts) && q.prompts.forEach((pr, pri) => {
    if (!row) row = {
      question_id: q.name,
      ...row_default
    }
    row.type = 'question_prompt'
    row.option_id = pri * 100
    console.log('debug')
    if (typeof o == 'object' || pr.prompt) {
      row.text = pr.prompt
      row.help = pr.help
    } else row.text = pr
    if (row) n.push(row)
    row = null
  })

  return row
}

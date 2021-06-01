let formData = [ //pages
  [ //sections
    {
      title: "Newcastle ENDOPREMTM: Patient Reported Experience Measure for Gastrointestinal Endoscopy",
      description: "Thank you for agreeing to take part in this survey - we really appreciate you taking the time to complete this questionnaire about your experience of having an endoscopy (camera) test or CT colonoscopy (scan).\n\nThe survey will take about 10 - 15 minutes to complete. All of the questions are important so please try to answer them all. There are no right or wrong answers - we are just interested in hearing about your experience so we can make improvements to the way we deliver the service. \n\nIf you need help filling in the survey you can ask someone to help you."
    }
  ],
  [ //sections
    {
      title: "Your Details",
      description: "Please answer all of the questions in this section by filling in the boxes or selecting the answer that applies to you.",
      questions: [{ //question      
        question: "When was your most recent test?",
        name: "testdate",
        type: "date",
        description: null,
      }]
    }, {
      title: "Your Details",
      questions: [{ //question      
        question: "Please fill in your age (in years)",
        name: "age",
        type: "number",
      }, {
        question: "Are you?",
        name: "gender",
        type: "radio",
        options: [{
          name: "Male"
        }, {
          name: "Female"
        }]
      }, { //question      
        question: "How many years of full time education you have completed?",
        name: "yearsofeducation",
        type: "number",
      }]
    }, {
      title: "Your Details",
      questions: [{ //question      
        question: "To which of these ethnic groups would you say you belong?",
        name: "ethnicity",
        type: "radio",
        options: [{
          name: "White",
          description: "(Including English/Welsh/Scottish, Northern Irish, British, Irish, Gypsy or Irish Traveller or any other White background)"
        }, {
          name: "Mixed/Multiple ethnic groups",
          description: "(Including White and Black Caribbean, White and Black African, White and Asian or any other mixed/multiple ethnic background)"
        }, {
          name: "Asian/British Asian",
          description: "(Including Indian, Pakistani, Bangladeshi, Chinese or any other Asian background)"
        }, {
          name: "Black/African/Caribbean/Black British",
          description: "(Including Black African, Black Caribbean or any other Black/African/Caribbean background)"
        }, {
          name: "Other ethnic group"
        }]
      }]
    }, {
      title: "Your Details",
      questions: [{ //question      
        question: "Please tell us if someone is helping you complete this survey",
        name: "whoiscompleting",
        type: "radio",
        options: [{
          name: "I am completing this survey by myself"
        }, {
          name: "Someone is helping me complete the survey"
        }]
      }]
    }, {
      title: "Your Details",
      questions: [{ //question      
        question: "Which test did you have on this occasion?",
        name: "testtype",
        type: "radio",
        options: [{
          name: "Colonoscopy",
          description: "(Camera or tube inserted through the back passage)"
        }, {
          name: "Gastroscopy",
          description: "(Camera or tube inserted through the mouth into the stomach)"
        }, {
          name: "Transnasal Gastroscopy",
          description: "(Camera/tube inserted through the nose into the stomach)"
        }, {
          name: "CT Colonoscopy",
          description: "(CT scan where a short tube is inserted into the back passage - done in the x-ray department)"
        }, {
          name: "I’m not sure"
        }]
      }]
    }, {
      title: "Your Details",
      questions: [{ //question      
        question: "Have you had another camera test or CT scan in the past?",
        name: "ispasttests",
        type: "radio",
        options: [{
          name: "Yes",
          action: {
            onchecked: true,
            name: "past-tests-details"
          }
        }, {
          name: "No"
        }]
      }, {
        name: "past-tests-details",
        type: "section",
        title: "Including your most recent test, please indicate which tests and how many you have had",
        questions: [{ //question      
          question: "Colonoscopy",
          description: "(Camera or tube inserted through the back passage)",
          name: "past-tests-details-colonscopy",
          type: "number",
          value: 0
        }, { //question      
          question: "Gastroscopy",
          description: "(Camera or tube inserted through the mouth into the stomach)",
          name: "past-tests-details-gastroscopy",
          type: "number",
          value: 0
        }, { //question      
          question: "Transnasal Gastroscopy",
          description: "(Camera/tube inserted through the nose into the stomach)",
          name: "past-tests-details-tg",
          type: "number",
          value: 0
        }, { //question      
          question: "CT Colonoscopy",
          description: "(CT scan where a short tube is inserted into the back passage - done in the x-ray department)",
          name: "past-tests-details-ctcolonscopy",
          type: "number",
          value: 0
        }, { //question      
          question: "Flexible Sigmoidoscopy",
          description: "(Camera inserted through the back passage into the last part of the bowel only - usually only requires an enema)",
          name: "past-tests-details-sigmoidoscopy",
          type: "number",
          value: 0
        }]
      }]
    }, {
      title: "Your Details",
      questions: [{ //question      
        question: "How were you referred for your most recent test?",
        name: "referred",
        type: "radio",
        options: [{
          name: "I was referred directly by my GP (without seeing a hospital doctor)",
        }, {
          name: "The test was organised by a hospital doctor"
        }, {
          name: "I have regular tests to monitor a medical condition/because of my family history"
        }, {
          name: "I was referred in another way",
          action: {
            onchecked: true,
            name: "referred-details"
          }
        }]
      }, {
        name: "referred-details",
        type: "section",
        questions: [{
          subsection: true,
          question: "Please tell us more",
          name: "referred-other",
          type: "long-text",
          description: null
        }]
      }]
    },
  ],
  [{
    title: "Before coming to hospital for your test",
    description: "In this section we want to find out about the time leading up to your test, before you came to hospital. Please answer all of the questions in this section by selecting the answers that apply to you.",
    questions: [{ //question      
      name: "b1",
      type: "likert-table",
      options: ["Strongly agree", "Agree",
        "Neither agree or disagree", "Disagree",
        "Strongly disagree"],
      prompts: [
        "I was happy with the way I was referred for the test",
        "The time from first being referred to having the test done was satisfactory",
        "I felt able to change the appointment if it didn’t suit me"
      ]
    }]
  }, {
    title: "Before coming to hospital for your test",
    questions: [{ //question      
      question: "My appointment was cancelled or changed by the hospital",
      name: "isCancelledAppointment",
      type: "radio",
      options: [{
        name: "Yes"
      }, {
        name: "No"
      }, {
        name: "Not sure / can’t remember"
      }]
    }]
  }, {
    title: "Before coming to hospital for your test",
    questions: [{ //question      
      name: "b2",
      type: "likert-table",
      options: ["Strongly agree", "Agree",
        "Neither agree or disagree", "Disagree",
        "Strongly disagree"],
      prompts: [
        "Before coming for the test, I was given enough information about what the test would involve",
        "After reading the information, I did not have any questions about the test"
      ]
    }]
  }, {
    title: "Before coming to hospital for your test",
    questions: [{ //question      
      question: "Before coming for the test",     
      name: "b3",
      type: "likert-table",
      options: ["Strongly agree", "Agree",
        "Neither agree or disagree", "Disagree",
        "Strongly disagree"],
      prompts: [
        "The instructions on what I needed to do before the test were easy to follow",
        "I had enough time to discuss the test with the person who referred me",
        "I felt anxious about what the test would involve",
        "I was made anxious by talking to other people who had previously had the test"
      ]
    }]
  }, {
    title: "Before coming to hospital for your test",
    questions: [{ //question      
      question: "Before coming for the test",     
      name: "b4",
      type: "likert-table",
      options: ["Strongly agree", "Agree",
        "Neither agree or disagree", "Disagree",
        "Strongly disagree"],
      prompts: [
        "I felt anxious about the results of the test",
        "I expected to experience discomfort during the test",
        "I expected to experience pain during the test",
        "I was worried that inserting the tube/ camera would cause discomfort"
      ]
    }]
  }],
  [ //sections
    {
      title: "Newcastle ENDOPREMTM: Patient Reported Experience Measure for Gastrointestinal Endoscopy",
      description: "Thank you for taking the time to complete this survey\n\nThis questionnaire was developed by Laura Neilson, Colin Rees, Linda Sharp, Joanne Patterson, Christian Von Wagner and Paul Hewitson in collaboration with South Tyneside and Sunderland NHS Foundation Trust and Newcastle University."
    }
  ],
]

export default formData
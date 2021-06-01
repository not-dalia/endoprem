let formData = {
  color: '#49508b',
  sections: [ //pages
    [ //sections
      {
        title: "Newcastle ENDOPREMTM: Patient Reported Experience Measure for Gastrointestinal Endoscopy",
        description: "Thank you for agreeing to take part in this survey - we really appreciate you taking the time to complete this questionnaire about your experience of having an endoscopy (camera) test or CT colonoscopy (scan).\n\nThe survey will take about 10 - 15 minutes to complete. All of the questions are important so please try to answer them all. There are no right or wrong answers - we are just interested in hearing about your experience so we can make improvements to the way we deliver the service. \n\nIf you need help filling in the survey you can ask someone to help you."
      }
    ],
    [ //sections
      {
        title: "After the test",
        description: "In this section we would like to know about your experience after the test including the results, if you’ve had them. Please answer all of the questions in this section by selecting the answers that apply to you.",
        questions: [{
          type: 'image',
          src: '/images/after.jpg'
          // src: 'https://www.youtube-nocookie.com/embed/wK2imf6w8Pw'
        }]
      },
      {
        title: "After the test",
        questions: [{ //question      
          name: "f1",
          type: "likert-table",
          options: ["Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "I was satisfied by the explanation given to me by the person doing the test",
            "I had discomfort after the test",
            "It took longer than I expected to recover from the test",
            "I was worried about the test results",
          ]
        }]
      }, {
        title: "After the test",
        questions: [{
          name: "f5",
          type: "radio",
          question: "Have you received the results of your test?",
          options: [{
            name: "Yes, I have received all of my test results",
          }, {
            name: "Yes, I have received some of my test results",
          }, {
            name: "No"
          }]
        }]
      }, {
        title: "After the test",
        questions: [{ //question      
          name: "f6",
          type: "likert-table",
          options: ["Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "When I left the hospital, I was clear about what the next steps would be",
          ]
        }, { //question      
          name: "f7",
          type: "likert-table",
          options: ["I do not have my results", "Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "I was happy with the way I received the results of my test",
            "I received the results of my test sooner than I had expected",
          ]
        }]
      },
    ],
    [ //sections
      {
        title: "Overall experience",
        description: "In this section we would like to know how you feel now about your overall experience. Please answer all of the questions in this section by selecting the answers that apply to you."
      }, {
        title: "At the hospital, before the test",
        questions: [{ //question      
          name: "g1",
          type: "likert-table",
          options: ["Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "Overall I was satisfied with my experience of the test",
          ]
        }, {
          question: "If there is something else you would like to tell us about your test, please use the space below",
          name: "g2",
          type: "long-text",
        }]
      }
    ],
    [ //sections
      {
        title: "Thank You",
        description: "Thank you for taking the time to complete this survey\n\nThis questionnaire was developed by Laura Neilson, Colin Rees, Linda Sharp, Joanne Patterson, Christian Von Wagner and Paul Hewitson in collaboration with South Tyneside and Sunderland NHS Foundation Trust and Newcastle University."
      }
    ],
  ]
}

export default formData
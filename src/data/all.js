let formData = {
  color: '#009688',
  sections: [ //pages
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
        questions: [{
          type: 'image',
          src: '/images/fillingform.jpg'
          // src: 'https://www.youtube-nocookie.com/embed/wK2imf6w8Pw'
        }]
      }, {
        title: "Your Details",
        questions: [{ //question      
          question: "When was your most recent test?",
          name: "testdate",
          type: "date",
          description: null,
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."
        }]
      }, {
        title: "Your Details",
        questions: [{ //question      
          question: "Please fill in your age (in years)",
          name: "age",
          type: "number",
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."
        }, {
          question: "Are you?",
          name: "gender",
          type: "radio",
          options: [{
            name: "Male"
          }, {
            name: "Female"
          }],
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."
        }, { //question      
          question: "How many years of full time education you have completed?",
          name: "yearsofeducation",
          type: "number",
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."
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
          }],
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."
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
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc.",
          questions: [{ //question      
            question: "Colonoscopy",
            description: "(Camera or tube inserted through the back passage)",
            name: "past-tests-details-colonscopy",
            type: "number",
            value: 0,
            help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."
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
      description: "In this section we want to find out about the time leading up to your test, before you came to hospital. Please answer all of the questions in this section by selecting the answers that apply to you."
    }, {
      title: "Before coming to hospital for your test",
      questions: [{ //question      
        name: "b1",
        type: "likert-table",
        options: ["Strongly agree", "Agree",
          "Neither agree or disagree", "Disagree",
          "Strongly disagree"
        ],
        prompts: [
          {prompt: "I was happy with the way I was referred for the test", help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."},
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
          name: "Yes",
          action: {
            onchecked: true,
            type: "end-survey"
          }
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
          "Strongly disagree"
        ],
        prompts: [
          "Before coming for the test, I was given enough information about what the test would involve",
          "After reading the information, I did not have any questions about the test"
        ]
      }]
    }, {
      title: "Before coming to hospital for your test",
      questions: [{ //question      
        name: "b3",
        type: "likert-table",
        options: ["Strongly agree", "Agree",
          "Neither agree or disagree", "Disagree",
          "Strongly disagree"
        ],
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
        name: "b4",
        type: "likert-table",
        options: ["Strongly agree", "Agree",
          "Neither agree or disagree", "Disagree",
          "Strongly disagree"
        ],
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
        title: "Preparing for your test",
        description: "In this section we would like to know about your experience of preparing for the test. Please answer all of the questions in this section by filling in the boxes or selecting the answer that applies to you."
      }, {
        title: "Preparing for your test",
        questions: [{ //question      
          question: "My appointment was cancelled or changed by the hospital",
          name: "isCancelledAppointment",
          type: "radio",
          options: [{
            name: "Yes",
            action: {
              onchecked: true,
              type: "end-survey"
            }
          }, {
            name: "No"
          }, {
            name: "Not sure / can’t remember"
          }]
        }]
      },
      {
        title: "Preparing for your test",
        questions: [{ //question      
          question: "Before coming for the test",
          name: "c1",
          type: "likert-table",
          options: ["Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "The bowel preparation had an unpleasant taste",
            "The bowel preparation tasted better than I had expected",
            "The volume (amount) of the bowel preparation was more than I had expected",
            "The amount of bowel preparation I had to drink was manageable",
            "I was worried that the bowel preparation would not clear my bowel properly",
            "I had enough privacy when getting ready for the test (eg when changing clothes)"
          ]
        }]
      },
    ],
    [ //sections
      {
        title: "At the hospital, before the test",
        description: "In this section we would like to know about your experience of arriving at the hospital, getting ready and waiting for the test. Please answer all of the questions in this section by selecting the answers that apply to you.",
        questions: [{
          type: 'image',
          src: '/images/waiting.jpg'
          // src: 'https://www.youtube-nocookie.com/embed/wK2imf6w8Pw'
        }]
      }, {
        title: "At the hospital, before the test",
        questions: [{ //question      
          name: "d1",
          type: "likert-table",
          options: ["Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "The length of time I waited in the department was acceptable",
            "I was comfortable while sitting in the waiting area",
            "I felt able to ask the staff any questions before the test",
            "I had no unanswered questions before the test",
          ]
        }]
      }, {
        title: "At the hospital, before the test",
        questions: [{ //question      
          name: "d2",
          type: "likert-table",
          options: ["Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "I had enough privacy when waiting for the test",
            "I had enough privacy when moving from the waiting area to the procedure room"
          ]
        }]
      }
    ],
    [ //sections
      {
        title: "During the test",
        description: "In this section we would like to know about your experience of the test, from arriving in the procedure room until it was time to leave the procedure room.  Please answer all of the questions in this section by selecting the answers that apply to you.",
        questions: [{
          type: 'image',
          src: '/images/medical1.jpg'
          // src: 'https://www.youtube-nocookie.com/embed/wK2imf6w8Pw'
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
          name: "e1",
          type: "likert-table",
          options: ["Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "During the test my dignity was maintained at all times",
            "I felt free to choose what medication to take (eg sedative, no medication)",
          ]
        }, { //question      
          name: "e3",
          type: "likert-table",
          options: ["I did not have any medication", "Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "The medication worked as well as I had expected",
          ]
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
          question: "I would have preferred the person doing the test (inserting the tube or camera) to be",
          name: "e4",
          type: "radio",
          options: [{
            name: "Male"
          }, {
            name: "Female"
          }]
        }, { //question      
          question: "The person doing the test was",
          name: "e5",
          type: "radio",
          options: [{
            name: "Male"
          }, {
            name: "Female"
          }]
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
          name: "e6",
          type: "likert-table",
          options: ["Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "I felt confident that the person doing the test knew what they were doing",
            "The person doing the test did their best to put me at ease",
            "The other staff in the test room did their best to put me at ease",
            "I was satisfied with the explanation given to me about the test",
            "The person doing the test addressed any concerns I had",
            "I felt I could stop the test if it became too uncomfortable",
            "I felt embarrassed during the test",
            "The test took longer than I expected"
          ]
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
          question: "How would you rate the level of discomfort you experienced during the test?",
          name: "e14",
          type: "likert-bar",
          options: {
            from: 0,
            to: 10,
            startText: "No discomfort",
            endText: "Worst discomfort imaginable"
          },
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."
        }, { //question      
          question: "How long did the discomfort last during the test?",
          name: "e15",
          type: "radio",
          options: [{
            name: "I didn’t have discomfort"
          }, {
            name: "A short time"
          }, {
            name: "A moderate time"
          }, {
            name: "A long time"
          }]
        }, { //question      
          question: "How many times did you experience discomfort during the test?",
          name: "e16",
          type: "radio",
          options: [{
            name: "None"
          }, {
            name: "1 or 2 times"
          }, {
            name: "3 or 4 times"
          }, {
            name: "More than 4"
          }, {
            name: "Constantly"
          }]
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
          question: "How would you rate the level of pain you experienced during the test?",
          name: "e17",
          type: "likert-bar",
          options: {
            from: 0,
            to: 10,
            startText: "No pain",
            endText: "Worst pain imaginable"
          }
        }, { //question      
          question: "How long did the pain last during the test?",
          name: "e18",
          type: "radio",
          options: [{
            name: "I didn’t have pain"
          }, {
            name: "A short time"
          }, {
            name: "A moderate time"
          }, {
            name: "A long time"
          }]
        }, { //question      
          question: "How many times did you experience pain during the test?",
          name: "e19",
          type: "radio",
          options: [{
            name: "None"
          }, {
            name: "1 or 2 times"
          }, {
            name: "3 or 4 times"
          }, {
            name: "More than 4"
          }, {
            name: "Constantly"
          }]
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
          name: "e20",
          type: "likert-table",
          options: ["Strongly agree", "Agree",
            "Neither agree or disagree", "Disagree",
            "Strongly disagree"
          ],
          prompts: [
            "Overall, I experienced more discomfort than I expected during the test",
            "Overall, I experienced more pain than I expected during the test",
            "I felt embarrassed by the discomfort I experienced",
            "I felt embarrassed by the pain I experienced"
          ]
        }]
      },
    ],
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
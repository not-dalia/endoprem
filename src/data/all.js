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
          src: '/images/fillingform.jpg',
          alt: ''
          // src: 'https://www.youtube-nocookie.com/embed/wK2imf6w8Pw'
        }]
      }, {
        title: "Your Details",
        questions: [{ //question      
          question: "What is your study ID?",
          name: "studyId",
          type: "studyid",
          description: "Ex: NU  090003  123456789",
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc.",
          /* validationRules: {
            required: true
          } */
        }, { //question      
          question: "When was your most recent test?",
          name: "testdate",
          type: "date",
          description: null,
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc.",
          validationRules: {
            min: 0,
            max: 120
          }
        }]
      }, {
        title: "Your Details",
        questions: [{ //question      
          question: "Please fill in your age (in years)",
          name: "A3",
          type: "number",
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc.",
          missingValue: 999,
          validationRules: {
            // required: true,
            min: 18,
          }
        }, {
          name: "A3AgeGroups",
          type: "function",
          input: ["A3"],
          missingValue: 999,
          handler: (age) => {
            if (age < 18 || age > 99) return 999
            let decade = Math.floor(age / 10)
            if (decade == 1) decade = 2
            return decade - 1
          }
        }, {
          question: "Are you?",
          name: "A4",
          missingValue: 9,
          type: "radio",
          options: [{
            text: "Male",
            value: 1
          }, {
            text: "Female",
            value: 2
          }],
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc.",
          // validationRules: {
          //   required: true,
          // }
        }, { //question      
          question: "How many years of full time education you have completed?",
          name: "A5",
          type: "number",
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."
        }]
      }, {
        title: "Your Details",
        questions: [{ //question      
          question: "To which of these ethnic groups would you say you belong?",
          name: "A6",
          missingValue: 9,
          type: "radio",
          options: [{
            text: "White",
            description: "(Including English/Welsh/Scottish, Northern Irish, British, Irish, Gypsy or Irish Traveller or any other White background)",
            value: 1
          }, {
            text: "Mixed / Multiple ethnic groups",
            description: "(Including White and Black Caribbean, White and Black African, White and Asian or any other mixed/multiple ethnic background)",
            value: 2
          }, {
            text: "Asian / British Asian",
            description: "(Including Indian, Pakistani, Bangladeshi, Chinese or any other Asian background)",
            value: 3
          }, {
            text: "Black / African / Caribbean / Black British",
            description: "(Including Black African, Black Caribbean or any other Black / African / Caribbean background)",
            value: 4
          }, {
            text: "Other ethnic group",
            value: 5
          }]
        }]
      }, {
        title: "Your Details",
        questions: [{ //question      
          question: "Please tell us if someone is helping you complete this survey",
          name: "A7",
          missingValue: 9,
          type: "radio",
          options: [{
            text: "I am completing this survey by myself",
            value: 1
          }, {
            text: "Someone is helping me complete the survey",
            value: 2
          }]
        }]
      }, {
        title: "Your Details",
        questions: [{ //question      
          question: "Which test did you have on this occasion?",
          name: "A8",
          missingValue: 9,
          type: "radio",
          options: [{
            text: "Colonoscopy",
            description: "(Camera or tube inserted through the back passage)",
            value: 1
          }, {
            text: "Gastroscopy",
            description: "(Camera or tube inserted through the mouth into the stomach)",
            value: 2
          }, {
            text: "Transnasal Gastroscopy",
            description: "(Camera/tube inserted through the nose into the stomach)",
            value: 3
          }, {
            text: "CT Colonoscopy/Pneumocolon",
            description: "(CT scan where a short tube is inserted into the back passage - done in the x-ray department)",
            value: 4
          }, {
            text: "OGD and Colonoscopy",
            description: "",
            value: 5
          }, {
            text: "Colonoscopy and CTC",
            description: "",
            value: 6
          }, {
            text: "I’m not sure",
            value: 8
          }]
        }, {
          name: "A8NEW",
          type: "function",
          missingValue: 9
        }]
      }, {
        title: "Your Details",
        questions: [{ //question      
          question: "Have you had another camera test or CT scan in the past?",
          name: "A9A",
          missingValue: 9,
          type: "radio",
          options: [{
            text: "Yes",
            value: 1,
            action: {
              onchecked: true,
              name: "past-tests-details"
            }
          }, {
            text: "No",
            value: 0
          }],
          // validationRules: {
          //   required: true
          // }
        }, { // TODO: missing A9x1 (tickboxes whether there were any of the below)
          name: "past-tests-details",
          type: "section",
          title: "Including your most recent test, please indicate which tests and how many you have had",
          help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc.",
          questions: [{ //question      
            question: "Colonoscopy",
            description: "(Camera or tube inserted through the back passage)",
            name: "A9a2",
            missingValue: 999,
            type: "number",
            value: 0,
            help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc.",
            // validationRules: {
            //   required: true
            // }
          }, { //question      
            question: "Gastroscopy",
            description: "(Camera or tube inserted through the mouth into the stomach)",
            name: "A9b2",
            missingValue: 999,
            type: "number",
            value: 0
          }, { //question      
            question: "Transnasal Gastroscopy",
            description: "(Camera/tube inserted through the nose into the stomach)",
            name: "A9c2",
            missingValue: 999,
            type: "number",
            value: 0
          }, { //question      
            question: "CT Colonoscopy",
            description: "(CT scan where a short tube is inserted into the back passage - done in the x-ray department)",
            name: "A9d2",
            missingValue: 999,
            type: "number",
            value: 0
          }, { //question      
            question: "Flexible Sigmoidoscopy",
            description: "(Camera inserted through the back passage into the last part of the bowel only - usually only requires an enema)",
            name: "A9e2",
            missingValue: 999,
            type: "number",
            value: 0
          }]
        }]
      }, {
        title: "Your Details",
        questions: [{ //question      
          question: "How were you referred for your most recent test?",
          name: "A10a",
          missingValue: 9,
          type: "radio",
          options: [{
            text: "I was referred directly by my GP (without seeing a hospital doctor)",
            value: 1
          }, {
            text: "The test was organised by a hospital doctor",
            value: 2
          }, {
            text: "I have regular tests to monitor a medical condition",
            value: 3
          }, {
            text: "I have regular tests because of my family history",
            value: 4
          }, {
            text: "I was referred in another way",
            value: 5,
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
            name: "A10b",
            missingValue: 9,
            type: "long-text",
            canRecordAudio: false,
            description: null,
            help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc.",
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
        name: "b1", // B1-B3 in print 1.0
        type: "likert-table",
        options: [{
            text: "Strongly agree",
            value: 5
          },
          {
            text: "Agree",
            value: 4
          },
          {
            text: "Neither agree or disagree",
            value: 3
          },
          {
            text: "Disagree",
            value: 2
          },
          {
            text: "Strongly disagree",
            value: 1
          }
        ],
        prompts: [{
            prompt: "I was happy with the way I was referred for the test",
            name: "B1R",
            help: "What's up?",
            missingValue: 9,
          }, // TODO: implement reverseValues (i.e.agree=5,disagree=1)
          {
            prompt: "The time from first being referred to having the test done was satisfactory",
            name: "B2R",
            missingValue: 9,
          },
          {
            prompt: "I felt able to change the appointment if it didn’t suit me",
            name: "B3R",
            missingValue: 9,
          }
        ],
        // validationRules: {
        //   required: true
        // }
      }]
    }, {
      title: "Before coming to hospital for your test",
      questions: [{ //question      
        question: "My appointment was cancelled or changed by the hospital",
        name: "B4",
        missingValue: 9,
        type: "radio",
        options: [{
          text: "Yes",
          value: 1,
          action: {
            onchecked: true,
            type: "end-survey"
          }
        }, {
          text: "No",
          value: 0
        }, {
          text: "Not sure / can’t remember",
          value: 8
        }]
      }]
    }, {
      title: "Before coming to hospital for your test",
      questions: [{ //question      
        name: "b2", // B5-B6 in print 1.0
        type: "likert-table",
        options: [{
            text: "Strongly agree",
            value: 5
          },
          {
            text: "Agree",
            value: 4
          },
          {
            text: "Neither agree or disagree",
            value: 3
          },
          {
            text: "Disagree",
            value: 2
          },
          {
            text: "Strongly disagree",
            value: 1
          }
        ],
        prompts: [{
            prompt: "Before coming for the test, I was given enough information about what the test would involve",
            name: "B5R",
            missingValue: 9,
          },
          // TOOD: missing B6R 'Info Easy' (not in the paper version)
          {
            prompt: "After reading the information, I did not have any questions about the test",
            name: "B7R",
            missingValue: 9,
          }
        ]
      }]
    }, {
      title: "Before coming to hospital for your test",
      questions: [{ //question      
        name: "b3", // B7-B10 in print 1.0
        type: "likert-table",
        options: [{
            text: "Strongly agree",
            value: 1
          },
          {
            text: "Agree",
            value: 2
          },
          {
            text: "Neither agree or disagree",
            value: 3
          },
          {
            text: "Disagree",
            value: 4
          },
          {
            text: "Strongly disagree",
            value: 5
          }
        ],
        prompts: [{
            prompt: "The instructions on what I needed to do before the test were easy to follow",
            name: "B8R",
            missingValue: 9,
            reverseValues: true
          },
          {
            prompt: "I had enough time to discuss the test with the person who referred me",
            name: "B9R",
            missingValue: 9,
            reverseValues: true
          },
          {
            prompt: "I felt anxious about what the test would involve",
            name: "B10",
            missingValue: 9
          },
          {
            prompt: "I was made anxious by talking to other people who had previously had the test",
            name: "B11",
            missingValue: 9
          }
        ]
      }]
    }, {
      title: "Before coming to hospital for your test",
      questions: [{ //question      
          name: "b4", // B11-B14 in print 1.0
          type: "likert-table",
          options: [{
              text: "Strongly agree",
              value: 1
            },
            {
              text: "Agree",
              value: 2
            },
            {
              text: "Neither agree or disagree",
              value: 3
            },
            {
              text: "Disagree",
              value: 4
            },
            {
              text: "Strongly disagree",
              value: 5
            }
          ],
          prompts: [{
              prompt: "I felt anxious about the results of the test",
              name: "B12",
              missingValue: 9
            },
            {
              prompt: "I expected to experience discomfort during the test",
              name: "B13",
              missingValue: 9
            },
            {
              prompt: "I expected to experience pain during the test",
              name: "B14",
              missingValue: 9
            },
            {
              prompt: "I was worried that inserting the tube/ camera would cause discomfort",
              name: "B15",
              missingValue: 9
            }
          ]
        },
        {
          name: "B16", // TODO: missing B16 likert 'Same Sex' (not in print 1.0)
          type: "function",
          missingValue: 9
        }
      ]
    }],
    [ //sections
      {
        title: "Preparing for your test",
        description: "In this section we would like to know about your experience of preparing for the test. Please answer all of the questions in this section by filling in the boxes or selecting the answer that applies to you."
      },
      /* {
             title: "Preparing for your test",
             questions: [{ //question      
               question: "My appointment was cancelled or changed by the hospital",
               name: "isCancelledAppointment",
               type: "radio",
               options: [{
                 text: "Yes",
                 action: {
                   onchecked: true,
                   type: "end-survey"
                 }
               }, {
                 text: "No"
               }, {
                 text: "Not sure / can’t remember"
               }]
             }]
           }, */
      {
        title: "Preparing for your test",
        questions: [{ //question      
          question: "Before coming for the test",
          name: "c1", // C1-C6 in print 1.0
          type: "likert-table",
          options: [{
              text: "Strongly agree",
              value: 1
            },
            {
              text: "Agree",
              value: 2
            },
            {
              text: "Neither agree or disagree",
              value: 3
            },
            {
              text: "Disagree",
              value: 4
            },
            {
              text: "Strongly disagree",
              value: 5
            }
          ],
          prompts: [{
              prompt: "The bowel preparation had an unpleasant taste",
              name: "C1",
              missingValue: 9
            },
            {
              prompt: "The bowel preparation tasted better than I had expected",
              name: "C2R",
              missingValue: 9,
              reverseValues: true
            },
            {
              prompt: "The volume (amount) of the bowel preparation was more than I had expected",
              name: "C3",
              missingValue: 9
            },
            {
              prompt: "The amount of bowel preparation I had to drink was manageable",
              name: "C4R",
              missingValue: 9,
              reverseValues: true
            },
            {
              prompt: "I was worried that the bowel preparation would not clear my bowel properly",
              name: "C5",
              missingValue: 9
            },
            {
              prompt: "I had enough privacy when getting ready for the test (eg when changing clothes)",
              name: "C6R",
              missingValue: 9,
              reverseValues: true
            }
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
          src: '/images/waiting.jpg',
          alt: ''
          // src: 'https://www.youtube-nocookie.com/embed/wK2imf6w8Pw'
        }]
      }, {
        title: "At the hospital, before the test",
        questions: [{ //question      
          name: "d1", // D1-D4 in print 1.0
          type: "likert-table",
          options: [{
              text: "Strongly agree",
              value: 1
            },
            {
              text: "Agree",
              value: 2
            },
            {
              text: "Neither agree or disagree",
              value: 3
            },
            {
              text: "Disagree",
              value: 4
            },
            {
              text: "Strongly disagree",
              value: 5
            }
          ],
          prompts: [{
              prompt: "The length of time I waited in the department was acceptable",
              name: "D1",
              missingValue: 9
            },
            {
              prompt: "I was comfortable while sitting in the waiting area",
              name: "D2R",
              missingValue: 9,
              reverseValues: true
            },
            {
              prompt: "I felt able to ask the staff any questions before the test",
              name: "D3R",
              missingValue: 9,
              reverseValues: true
            },
            {
              prompt: "I had no unanswered questions before the test",
              name: "D4R",
              missingValue: 9,
              reverseValues: true
            }
          ]
        }]
      }, {
        title: "At the hospital, before the test",
        questions: [{ //question      
          name: "d2", // D5-D6 in print 1.0
          type: "likert-table",
          options: [{
              text: "Strongly agree",
              value: 5
            },
            {
              text: "Agree",
              value: 4
            },
            {
              text: "Neither agree or disagree",
              value: 3
            },
            {
              text: "Disagree",
              value: 2
            },
            {
              text: "Strongly disagree",
              value: 1
            }
          ],
          prompts: [{
              prompt: "I had enough privacy when waiting for the test",
              name: "D5R",
              missingValue: 9,
            },
            {
              prompt: "I had enough privacy when moving from the waiting area to the procedure room",
              name: "D6R",
              missingValue: 9,
            }, // TODO: D6R not in SSPS
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
          src: '/images/medical1.jpg',
          alt: ''
          // src: 'https://www.youtube-nocookie.com/embed/wK2imf6w8Pw'
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
          name: "e1", // E1 to E2 in print 1.0
          type: "likert-table",
          options: [{
              text: "Strongly agree",
              value: 5
            },
            {
              text: "Agree",
              value: 4
            },
            {
              text: "Neither agree or disagree",
              value: 3
            },
            {
              text: "Disagree",
              value: 2
            },
            {
              text: "Strongly disagree",
              value: 1
            }
          ],
          prompts: [{
              prompt: "During the test my dignity was maintained at all times",
              name: "E1R",
            }, // TODO: missing value is None in SSPS
            {
              prompt: "I felt free to choose what medication to take (eg sedative, no medication)",
              name: "E2R",
            }, // TODO: missing value is None in SSPS
          ]
        }, { //question      
          name: "e2", // E3 in print 1.0
          type: "likert-table",
          options: [{
              text: "Strongly agree",
              value: 5
            },
            {
              text: "Agree",
              value: 4
            },
            {
              text: "Neither agree or disagree",
              value: 3
            },
            {
              text: "Disagree",
              value: 2
            },
            {
              text: "Strongly disagree",
              value: 1
            },
            {
              text: "I did not have any medication",
              value: 8
            }
          ],
          prompts: [{
              prompt: "The medication worked as well as I had expected",
              name: "E3R"
            } // TODO: missing value is None in SSPS
          ]
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
          question: "I would have preferred the person doing the test (inserting the tube or camera) to be",
          name: "E4", // E4 in print 1.0
          missingValue: 9,
          type: "radio",
          options: [{
              text: "Male",
              value: 1
            },
            {
              text: "Female",
              value: 2
            }
          ]
        }, { //question      
          question: "The person doing the test was",
          name: "E5", // E5 in print 1.0
          missingValue: 9, // TODO: E5 not in SSPS
          type: "radio",
          options: [{
              text: "Male",
              value: 1
            },
            {
              text: "Female",
              value: 2
            }
          ]
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
          name: "e3", // E6-E13 in print 1.0 
          type: "likert-table",
          options: [{
              text: "Strongly agree",
              value: 5
            },
            {
              text: "Agree",
              value: 4
            },
            {
              text: "Neither agree or disagree",
              value: 3
            },
            {
              text: "Disagree",
              value: 2
            },
            {
              text: "Strongly disagree",
              value: 1
            },
            {
              text: "I did not have any medication",
              value: 8
            }
          ],
          prompts: [{
              prompt: "I felt confident that the person doing the test knew what they were doing",
              name: "E5R",
              reverseValues: true
            }, // TODO: missing value is None in SSPS
            {
              prompt: "The person doing the test did their best to put me at ease",
              name: "E6R",
              reverseValues: true
            }, // TODO: missing value is None in SSPS
            {
              prompt: "The other staff in the test room did their best to put me at ease",
              name: "E7R",
              reverseValues: true
            }, // TODO: missing value is None in SSPS
            {
              prompt: "I was satisfied with the explanation given to me about the test",
              name: "E8R",
              reverseValues: true
            }, // TODO: missing value is None in SSPS
            {
              prompt: "The person doing the test addressed any concerns I had",
              name: "E9R",
              reverseValues: true
            }, // TODO: missing value is None in SSPS
            {
              prompt: "I felt I could stop the test if it became too uncomfortable",
              name: "E10R",
              reverseValues: true
            }, // TODO: missing value is None in SSPS
            {
              prompt: "I felt embarrassed during the test",
              name: "E11",
              missingValue: 9
            },
            {
              prompt: "The test took longer than I expected",
              name: "E12",
              missingValue: 9
            },
          ]
        }]
      }, {
        title: "During the test",
        questions: [{ //question      
            question: "How would you rate the level of discomfort you experienced during the test?",
            name: "E13", // E14 in print 1.0
            missingValue: 999,
            type: "likert-bar",
            options: {
              from: 0,
              to: 10,
              startText: "No discomfort",
              endText: "Worst discomfort imaginable"
            },
            // validationRules: {
            //   required: true
            // },
            help: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque rhoncus vestibulum. Maecenas dapibus vestibulum semper. Proin eget tempus lacus. Mauris diam odio, tempus quis tempor interdum, porta eget nunc."
          },

          {
            name: "E13MEASURED", // TODO: missing E13MEASURED 'Discomf VAS Measured' (not in print 1.0)
            type: "function",
            missingValue: 999
          },
          {
            name: "E13NEW", // TODO: missing E13NEW 'VAS and circle merged' (not in print 1.0)
            type: "function",
            missingValue: 999
          },
          {
            name: "E13ANSWER", // TODO: missing E13ANSWER  likert 'How VAS completed' (not in print 1.0)
            type: "function",
            missingValue: 9
          },

          { //question      
            question: "How long did the discomfort last during the test?",
            name: "E14R", // E15 in print 1.0
            missingValue: 9,
            type: "radio",
            options: [{
                text: "I didn’t have discomfort",
                value: 4
              },
              {
                text: "A short time",
                value: 3
              },
              {
                text: "A moderate time",
                value: 2
              },
              {
                text: "A long time",
                value: 1
              }
            ]
          }, { //question      
            question: "How many times did you experience discomfort during the test?",
            name: "E15R", // E16 in print 1.0
            missingValue: 9,
            type: "radio",
            options: [{
                text: "None",
                value: 5
              },
              {
                text: "1 or 2 times",
                value: 4
              },
              {
                text: "3 or 4 times",
                value: 3
              },
              {
                text: "More than 4",
                value: 2
              },
              {
                text: "Constantly",
                value: 1
              },
            ]
          }
        ]
      }, {
        title: "During the test",
        questions: [{ //question      
            question: "How would you rate the level of pain you experienced during the test?",
            name: "E16", // E17 in print 1.0
            missingValue: 999,
            type: "likert-bar",
            options: {
              from: 0,
              to: 10,
              startText: "No pain",
              endText: "Worst pain imaginable"
            }
          },

          {
            name: "E16MEASURED", // TODO: missing E16MEASURED 'Discomf VAS' (not in print 1.0)
            type: "function",
            missingValue: 999
          },
          {
            name: "E16NEW", // TODO: missing E16NEW 'VAS and circle merged' (not in print 1.0)
            type: "function",
            missingValue: 999
          },
          {
            name: "E16ANSWER", // TODO: missing E16ANSWER likert 'How pain completed' (not in print 1.0)
            type: "function",
            missingValue: 9
          },

          { //question      
            question: "How long did the pain last during the test?",
            name: "E17R", // E18 in print 1.0
            missingValue: 9,
            type: "radio",
            options: [{
                text: "I didn’t have pain",
                value: 4
              }, // TODO: in SSPS it is 'I didn't have discomfort', like in E14R
              {
                text: "A short time",
                value: 3
              },
              {
                text: "A moderate time",
                value: 2
              },
              {
                text: "A long time",
                value: 1
              }
            ]
          }, { //question      
            question: "How many times did you experience pain during the test?",
            name: "E18R", // E19 in print 1.0
            missingValue: 9,
            type: "radio",
            options: [{
                text: "None",
                value: 5
              },
              {
                text: "1 or 2 times",
                value: 4
              },
              {
                text: "3 or 4 times",
                value: 3
              },
              {
                text: "More than 4",
                value: 2
              },
              {
                text: "Constantly",
                value: 1
              },
            ]
          }
        ]
      }, {
        title: "During the test",
        questions: [{ //question      
          name: "e4", // E20-E23 in print 1.0
          type: "likert-table",
          options: [{
              text: "Strongly agree",
              value: 1
            },
            {
              text: "Agree",
              value: 2
            },
            {
              text: "Neither agree or disagree",
              value: 3
            },
            {
              text: "Disagree",
              value: 4
            },
            {
              text: "Strongly disagree",
              value: 5
            }
          ],
          prompts: [{
              prompt: "Overall, I experienced more discomfort than I expected during the test",
              name: "E19",
              missingValue: 9
            },
            {
              prompt: "Overall, I experienced more pain than I expected during the test",
              name: "E20",
              missingValue: 9
            },
            {
              prompt: "I felt embarrassed by the discomfort I experienced",
              name: "E21",
              missingValue: 9
            },
            {
              prompt: "I felt embarrassed by the pain I experienced",
              name: "E22",
              missingValue: 9
            },
          ]
        }]
      },
    ],
    [ //sections
      {
        title: "After the test",
        description: "In this section we would like to know about your experience after the test including the results, if you’ve had them. Please answer all of the questions in this section by selecting the answers that apply to you.",
        questions: [{
          type: 'image',
          src: '/images/after.jpg',
          alt: ''
          // src: 'https://www.youtube-nocookie.com/embed/wK2imf6w8Pw'
        }]
      },
      {
        title: "After the test",
        questions: [{ //question      
            name: "f1", // F1-F4 in print 1.0
            type: "likert-table",
            options: [{
                text: "Strongly agree",
                value: 1
              },
              {
                text: "Agree",
                value: 2
              },
              {
                text: "Neither agree or disagree",
                value: 3
              },
              {
                text: "Disagree",
                value: 4
              },
              {
                text: "Strongly disagree",
                value: 5
              }
            ],
            prompts: [{
                prompt: "I was satisfied by the explanation given to me by the person doing the test",
                name: "F1R",
                reverseValues: true
              }, // TODO: missing value is None in SSPS
              {
                prompt: "I had discomfort after the test",
                name: "F3",
                missingValue: 9
              }, // TODO: SSPS has F3 'Discomf hosp' and F4 'Discomf home' (not in print 1.0)
              {
                prompt: "It took longer than I expected to recover from the test",
                name: "F5",
                missingValue: 9
              },
              {
                prompt: "I was worried about the test results",
                name: "F6",
                missingValue: 9
              },
            ]
          },
          {
            name: "F4", // TODO: missing F4, see F3 above
            type: "function",
            missingValue: 9
          },
        ]
      }, {
        title: "After the test",
        questions: [{
            name: "f2", // F5 in print 1.0
            type: "radio",
            question: "Have you received the results of your test?",
            options: [ // TODO: SSPS does not have these, it has F7a1-7 tickboxes, 'No Results', 'Await Biopsy', 'All Results', 'Results Posted', 'All Results Written', 'Written Await Biopsy', 'Results Different'
              {
                text: "Yes, I have received all of my test results",
                value: 3
              },
              {
                text: "Yes, I have received some of my test results",
                value: 2
              },
              {
                text: "No",
                value: 1
              }
            ]
          }
          // TODO: missing F7b free text (F5 in print 1.0), did not add function
        ]
      },
      {
        title: "After the test",
        questions: [{ //question      
            name: "f3", // F6 in print 1.0
            type: "likert-table",
            options: [{
                text: "Strongly agree",
                value: 1
              },
              {
                text: "Agree",
                value: 2
              },
              {
                text: "Neither agree or disagree",
                value: 3
              },
              {
                text: "Disagree",
                value: 4
              },
              {
                text: "Strongly disagree",
                value: 5
              }
            ],
            prompts: [{
              prompt: "When I left the hospital, I was clear about what the next steps would be",
              name: "F8",
              missingValue: 9
            }]
          }, { //question      
            name: "f4", // F7-F8 in print 1.0
            type: "likert-table",
            options: [{
                text: "I do not have my results",
                value: 8
              }, // TODO: do not ask based on f2
              {
                text: "Strongly agree",
                value: 5
              },
              {
                text: "Agree",
                value: 4
              },
              {
                text: "Neither agree or disagree",
                value: 3
              },
              {
                text: "Disagree",
                value: 2
              },
              {
                text: "Strongly disagree",
                value: 1
              },
            ],
            prompts: [{
                prompt: "I was happy with the way I received the results of my test",
                name: "F9R"
              }, // TODO: missing value is None in SSPS
              {
                prompt: "I received the results of my test sooner than I had expected",
                name: "F10R"
              } // TODO: missing value is None in SSPS               
            ]
          },

          {
            name: "F11R", // TODO: missing F11R 'Next steps' likert (not in print 1.0) 
            type: "function",
            // TODO: missing value is None in SSPS
          }
        ]
      },
    ],
    [ //sections
      {
        title: "Overall experience",
        description: "In this section we would like to know how you feel now about your overall experience. Please answer all of the questions in this section by selecting the answers that apply to you."
      }, {
        title: "Overall experience",
        questions: [{ //question      
            name: "g1",
            type: "likert-table",
            options: [{
                text: "Strongly agree",
                value: 5
              },
              {
                text: "Agree",
                value: 4
              },
              {
                text: "Neither agree or disagree",
                value: 3
              },
              {
                text: "Disagree",
                value: 2
              },
              {
                text: "Strongly disagree",
                value: 1
              }
            ],
            prompts: [{
                prompt: "Overall I was satisfied with my experience of the test",
                name: "G1R",
              } // TODO: no values in SSPS //TODO: missing value is None in SSPS
            ]
          },

          {
            name: "G2R", // TODO: missing G2R likert 'Better expected' (not in print 1.0), likely prompt with above
            type: "function",
            // TODO: missing vlaue is None in SSPS 
            // TODO: no values in SSPS
          },

          {
            question: "If there is something else you would like to tell us about your test, please use the space below",
            name: "G3",
            missingValue: 9,
            type: "long-text",
            canRecordAudio: false
          }
        ]
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
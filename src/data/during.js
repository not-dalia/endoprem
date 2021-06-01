let formData = {
  color: '#1c4a81',
  sections: [ //pages
    [ //sections
      {
        title: "Newcastle ENDOPREMTM: Patient Reported Experience Measure for Gastrointestinal Endoscopy",
        description: "Thank you for agreeing to take part in this survey - we really appreciate you taking the time to complete this questionnaire about your experience of having an endoscopy (camera) test or CT colonoscopy (scan).\n\nThe survey will take about 10 - 15 minutes to complete. All of the questions are important so please try to answer them all. There are no right or wrong answers - we are just interested in hearing about your experience so we can make improvements to the way we deliver the service. \n\nIf you need help filling in the survey you can ask someone to help you."
      }
    ],
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
            name: "Yes"
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
          }
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
        title: "Thank You",
        description: "Thank you for taking the time to complete this survey\n\nThis questionnaire was developed by Laura Neilson, Colin Rees, Linda Sharp, Joanne Patterson, Christian Von Wagner and Paul Hewitson in collaboration with South Tyneside and Sunderland NHS Foundation Trust and Newcastle University."
      }
    ],
  ]
}

export default formData
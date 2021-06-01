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
      description: "Please answer all of the questions in this section by filling in the boxes or putting a ‘✔‘ next to the answer that applies to you.",
      questions: [{ //question      
        question: "Name",
        name: "name",
        type: "text",
        description: null,
        maxChar: 50
      }, { //question      
        question: "Date of birth",
        description: "For example, 31 . 10 . 1970",
        name: "dob",
        type: "date",
        maxChar: 50
      }, { //question      
        question: "Address",
        name: "address",
        type: "long-text",
        description: null,
        maxChar: 255
      }, { //question      
        question: "Telephone",
        name: "telephone",
        type: "text",
        description: null,
        maxChar: 50
      }, { //question      
        question: "Sex",
        name: "sex",
        type: "text",
        description: null,
        maxChar: 50
      }, { //question      
        question: "Gender identity",
        name: "gender",
        type: "text",
        description: null,
        maxChar: 50
      }, { //question      
        question: "Martial Status",
        name: "marital-status",
        type: "text",
        description: null,
        maxChar: 50
      }, { //question      
        question: "Ethnic origin",
        name: "ethnicity",
        type: "text",
        description: null,
        maxChar: 50
      }, { //question      
        question: "Employment",
        name: "employment",
        type: "text",
        description: null,
        maxChar: 50
      }]
    },
  ],
  [{
    title: "Next of Kin",
    description: "Please fill in the following fields about your next of kin",
    questions: [{ //question      
      question: "Name of next of kin",
      description: "This question is about your next of kin",
      name: "nok-name",
      type: "text",
      maxChar: 50
    }, { //question      
      question: "Address of next of kin",
      name: "nok-address",
      type: "long-text",
      description: null,
      maxChar: 255
    }, { //question      
      question: "Telephone number of next of kin",
      name: "nok-telephone",
      type: "text",
      description: null,
      maxChar: 50
    }]
  }],
  [{
    title: "Carer/Supporter",
    description: "Please fill in the following fields about your carer or supporter",
    questions: [{ //question      
        question: "Name of carer/supporter",
        description: "This question is about your next of kin",
        name: "carer-name",
        type: "text",
        maxChar: 50
      }, { //question      
        question: "Address of carer/supporter",
        name: "carer-address",
        type: "long-text",
        description: null,
        maxChar: 255
      }, { //question      
        question: "Telephone number of carer/supporter",
        name: "carer-telephone",
        type: "text",
        description: null,
        maxChar: 50
      }, {
        question: "Do you currently receive any support from a carer or health / social care professional?",
        name: "receive-support",
        type: "radio",
        options: [{
          name: "Yes",
          action: {
            onchecked: true,
            name: "receive-support-details"
          }
        }, {
          name: "No"
        }]
      }, {
        name: "receive-support-details",
        type: "section",
        title: "If yes, please list all the people who currently support you",
        questions: [{
          name: "receive-support-extra-1",
          type: "section",
          subsection: true,
          questions: [{
            question: "Name",
            subsection: true,
            name: "receive-support-extra-1-name",
            type: "text",
            description: null
          }, {
            question: "Role",
            subsection: true,
            name: "receive-support-extra-1-role",
            type: "text",
            description: null
          }, {
            question: "Contact details",
            subsection: true,
            name: "receive-support-extra-1-contact",
            type: "long-text",
            description: null
          }, {
            question: "Consent to share review",
            subsection: true,
            name: "receive-support-extra-1-consent",
            type: "radio",
            options: [{
              name: "Yes",
            }, {
              name: "No"
            }]
          }]
        }, {
          name: "receive-support-extra-2",
          type: "section",
          subsection: true,
          questions: [{
            question: "Name",
            subsection: true,
            name: "receive-support-extra-2-name",
            type: "text",
            description: null
          }, {
            question: "Role",
            subsection: true,
            name: "receive-support-extra-2-role",
            type: "text",
            description: null
          }, {
            question: "Contact details",
            subsection: true,
            name: "receive-support-extra-2-contact",
            type: "long-text",
            description: null
          }, {
            question: "Consent to share review",
            subsection: true,
            name: "receive-support-extra-2-consent",
            type: "radio",
            options: [{
              name: "Yes",
            }, {
              name: "No"
            }]
          }]
        }, {
          name: "receive-support-extra-3",
          type: "section",
          subsection: true,
          questions: [{
            question: "Name",
            subsection: true,
            name: "receive-support-extra-3-name",
            type: "text",
            description: null
          }, {
            question: "Role",
            subsection: true,
            name: "receive-support-extra-3-role",
            type: "text",
            description: null
          }, {
            question: "Contact details",
            subsection: true,
            name: "receive-support-extra-3-contact",
            type: "long-text",
            description: null
          }, {
            question: "Consent to share review",
            subsection: true,
            name: "receive-support-extra-3-consent",
            type: "radio",
            options: [{
              name: "Yes",
            }, {
              name: "No"
            }]
          }]
        }]
      }

    ]
  }],
  [ //page
    {
      title: "Communication and Sensory Needs",
      description: "Many autistic people have different communication and sensory needs. Meeting these needs are likely to make the health check process better for you. Below, you can tell us what you would find helpful in supporting you to attend and engage with your health check appointment. This information will help the doctor understand your communication and sensory needs.",
      questions: [{
        question: "Please tick things that you would find helpful in supporting you to attend and engage with your health check appointment",
        name: "helpful-support-items",
        type: "checkbox",
        options: [{
          name: "A clinician who has experience of / training in understanding autism"
        }, {
          name: "Support to arrange appointment (e.g. office staff helping to schedule appointments, using alternative ways to telephone calls)"
        }, {
          name: "Receiving information about what is likely to happen during the visit beforehand",
        }, {
          name: "A quiet / individual waiting area",
        }, {
          name: "Scheduling appointments at quieter times of the day (e.g. first or last appointment of the day)",
        }, {
          name: "Minimising use of open questions",
        }, {
          name: "Using written information to support what is said in the appointment",
        }, {
          name: "Being shown all of the equipment/tests before they are carried out",
        }, {
          name: "Carrying out a ‘trial run’ of difficult examinations or procedures",
        }, {
          name: "Using a signal to tell the clinician you need a break",
        }, {
          name: "Extra processing time after information is given",
        }, {
          name: "Extra time given to make a decision about referral / treatment",
        }, {
          name: "Opportunity to ask questions about conclusions after the appointment",
        }, {
          name: "Written summary of the health check",
        }, {
          name: "Other ",
          action: {
            onchecked: true,
            name: "helpful-support-items-details"
          }
        }]
      }, {
        name: "helpful-support-items-details",
        type: "section",
        questions: [{
          subsection: true,
          question: "Please Specify",
          name: "helpful-support-items-other",
          type: "text",
          description: null
        }]
      }, {
        question: "Please describe how you usually communicate your needs to others (e.g. tell them, show them)",
        name: "communication-methods",
        type: "long-text",
        description: null
      }]
    }
  ],
  [ //page
    {
      title: "Additional diagnoses",
      questions: [{
        question: "Please list any other specific diagnoses or syndromes that you have been diagnosed with",
        name: "other-diagnoses",
        type: "checkbox",
        options: [{
          name: "Learning disability"
        }, {
          name: "Fragile X syndrome"
        }, {
          name: "Tubular sclerosis"
        }, {
          name: "Down syndrome"
        }, {
          name: "Other",
          action: {
            onchecked: true,
            name: "other-diagnoses-details"
          }
        }]
      }, {
        name: "other-diagnoses-details",
        type: "section",
        questions: [{
          question: "Please Specify",
          name: "other-diagnoses-other",
          type: "long-text",
          description: null
        }]
      }]
    }
  ],
  [ //page
    {
      title: "General Health",
      questions: [{
        question: "Do you have any current health problems or concerns?",
        name: "current-problems",
        type: "radio",
        options: [{
          name: "Yes",
          action: {
            onchecked: true,
            name: "current-problems-details"
          }
        }, {
          name: "No"
        }]
      }, {
        name: "current-problems-details",
        type: "section",
        questions: [{
          question: "Please describe your current health problems or concerns",
          name: "current-problems-extra",
          type: "long-text",
          description: null
        }, {
          question: "Please describe how your current health problems or concerns affect your daily life",
          name: "current-problems-daily",
          type: "long-text",
          description: null
        }]
      }, {
        question: "Do you have any future health concerns?",
        name: "future-problems",
        type: "radio",
        options: [{
          name: "Yes",
          action: {
            onchecked: true,
            name: "future-problems-details"
          }
        }, {
          name: "No"
        }]
      }, {
        name: "future-problems-details",
        type: "section",
        questions: [{
          question: "Please describe your future health concerns",
          name: "future-problems-extra",
          type: "long-text",
          description: null
        }]
      }]
    }
  ],
  [ //page
    {
      title: "Common Health Problems",
      description: "Below is a list of health problems commonly experienced by autistic people. Please indicate if you have any of the following",
      questions: [{
        question: "Do you experience any problems with sleeping?",
        name: "sleeping-problems",
        type: "radio",
        options: [{
          name: "Yes",
          action: {
            onchecked: true,
            name: "sleeping-problems-details"
          }
        }, {
          name: "No"
        }, {
          name: "Unsure"
        }]
      }, {
        name: "sleeping-problems-details",
        type: "section",
        questions: [{
          subsection: true,
          question: "If yes, please describe",
          name: "sleeping-problems-extra",
          type: "long-text",
          description: null
        }]
      }, {
        question: "Do you experience any gastrointestinal problems? (i.e. Irritable Bowel Syndrome, Inflammatory Bowel Disease, Crohn’s disease)?",
        name: "gastro-problems",
        type: "radio",
        options: [{
          name: "Yes",
          action: {
            onchecked: true,
            name: "gastro-problems-details"
          }
        }, {
          name: "No"
        }, {
          name: "Unsure"
        }]
      }, {
        name: "gastro-problems-details",
        type: "section",
        questions: [{
          subsection: true,
          question: "If yes, please describe",
          name: "gastro-problems-extra",
          type: "long-text",
          description: null
        }]
      }, {
        question: "Do you experience any eating problems?",
        name: "eating-problems",
        type: "radio",
        options: [{
          name: "Yes",
          action: {
            onchecked: true,
            name: "eating-problems-details"
          }
        }, {
          name: "No"
        }, {
          name: "Unsure"
        }]
      }, {
        name: "eating-problems-details",
        type: "section",
        questions: [{
          subsection: true,
          question: "If yes, please describe",
          name: "eating-problems-extra",
          type: "long-text",
          description: null
        }]
      }, {
        question: "Do you have epilepsy?",
        name: "epilepsy-problems",
        type: "radio",
        options: [{
          name: "Yes",
        }, {
          name: "No"
        }, {
          name: "Unsure"
        }]
      }, {
        question: "Have any of your biological relatives received a diagnosis of:",
        name: "relatives-problems",
        type: "checkbox",
        options: [{
          name: "Cancer",
        }, {
          name: "Diabetes"
        }, {
          name: "Mental health difficulties"
        }, {
          name: "Cardiovascular conditions"
        }, {
          name: "Epilepsy"
        }, {
          name: "Intellectual disability"
        }]
      }]
    }
  ],
  [{
    title: "Medications",
    description: "It is important for the doctor to know all medication(s) that you currently take.",
    questions: [{
      name: "medications",
      type: "section",
      title: "Please list any medications bought “over the counter” without a prescription, including alternative health remedies",
      questions: [{
        type: 'section',
        subsection: true,
        name: 'medication-details-1',
        questions: [
          {
            name: "medication-name-1",
            question: "Name",
            type: "text",
            subsection: true
          },
          {
            name: "medication-data-1",
            question: "How often and how much is taken?",
            type: "long-text",
            subsection: true
          }
        ]
      }, {
        type: 'section',
        subsection: true,
        name: 'medication-details-2',
        questions: [
          {
            name: "medication-name-2",
            question: "Name",
            type: "text",
            subsection: true
          },
          {
            name: "medication-data-2",
            question: "How often and how much is taken?",
            type: "long-text",
            subsection: true
          }
        ]
      }, {
        type: 'section',
        subsection: true,
        name: 'medication-details-3',
        questions: [
          {
            name: "medication-name-3",
            question: "Name",
            type: "text",
            subsection: true
          },
          {
            name: "medication-data-3",
            question: "How often and how much is taken?",
            type: "long-text",
            subsection: true
          }
        ]
      }, {
        type: 'section',
        subsection: true,
        name: 'medication-details-4',
        questions: [
          {
            name: "medication-name-4",
            question: "Name",
            type: "text",
            subsection: true
          },
          {
            name: "medication-data-4",
            question: "How often and how much is taken?",
            type: "long-text",
            subsection: true
          }
        ]
      }]
    }, {
      name: "side-effect",
      type: "long-text",
      question: "Are you experiencing any side effects from these medications?"
    }]
  }], [{
    title: "Allergies",
    questions: [{
      name: "allergy",
      type: "long-text",
      question: "Please list anything you have a diagnosed allergy to, including medications"
    }, {
      name: "intolerance",
      type: "long-text",
      question: "Please list anything you have a sensitivity or intolerance to"
    }]
  }]
]

export default formData
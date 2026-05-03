export interface Flashcard {
  id: number;
  question: string;
  answers: string[];
  acronym?: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 1,
    question: "What are the educational levels in our current Philippine educational system?",
    acronym: "BTH",
    answers: ["Basic Education", "Technical Vocational Education", "Higher Education"]
  },
  {
    id: 2,
    question: "Types of Curricula simultaneously operating in the schools.",
    acronym: "RWTSALH",
    answers: ["Recommended Curriculum", "Written Curriculum", "Taught Curriculum", "Supported Curriculum", "Assessed Curriculum", "Learned Curriculum", "Hidden / Implicit Curriculum"]
  },
  {
    id: 3,
    question: "He believes that education is experiencing.",
    answers: ["John Dewey"]
  },
  {
    id: 4,
    question: "Views curriculum as \"permanent studies\" where rules of grammar, reading, rhetoric, logic and mathematics for basic education are emphasized.",
    answers: ["Robert M. Hutchins"]
  },
  {
    id: 5,
    question: "Three ways of approaching a curriculum",
    answers: ["Curriculum as a Content or Body of Knowledge", "Curriculum as a Process", "Curriculum as a Product"]
  },
  {
    id: 6,
    question: "Four ways of presenting the content in the curriculum.",
    acronym: "TCTM",
    answers: ["Topical Approach", "Concept Approach", "Thematic Approach", "Modular Approach"]
  },
  {
    id: 7,
    question: "Discovery and mastery of the truths.",
    answers: ["Perennialism"]
  },
  {
    id: 8,
    question: "Mastery of basic skills.",
    answers: ["Essentialism"]
  },
  {
    id: 9,
    question: "He proposed the three laws of learning.",
    answers: ["Edward Thorndike (law of readiness, law of exercise and law of effect)"]
  },
  {
    id: 10,
    question: "He is the father of the classical conditioning theory.",
    answers: ["Ivan Pavlov"]
  },
  {
    id: 11,
    question: "He described curriculum change as a cooperative endeavor.",
    answers: ["Peter Oliva"]
  },
  {
    id: 12,
    question: "He is the proponent of cognitive development.",
    answers: ["Jean Piaget"]
  },
  {
    id: 13,
    question: "7 domains with clusters of competencies",
    acronym: "CLDCACP",
    answers: [
      "Domain 1: Competencies on Content Knowledge and Pedagogy",
      "Domain 2: Competencies on the Learning Environment",
      "Domain 3: Competencies on Diversity of Learners",
      "Domain 4: Competencies on Curriculum and Planning",
      "Domain 5: Competencies on Assessment and Reporting",
      "Domain 6: Competencies on Community Linkages and Professional Engagement",
      "Domain 7: Competencies on Personal Growth and Professional"
    ]
  },
  {
    id: 14,
    question: "It goes beyond existing knowledge. Pose new questions, offers new solutions.",
    answers: ["The Creating Mind"]
  },
  {
    id: 15,
    question: "It refers to the nontraditional education program recognized by the Department of Education (DepEd) which applies a flexible learning philosophy.",
    acronym: "ADM",
    answers: ["Alternative Delivery Mode"]
  },
  {
    id: 16,
    question: "What are the three processes in curriculum development?",
    answers: ["Planning", "Implementing", "Evaluating"]
  },
  {
    id: 17,
    question: "Factors in technology selection",
    acronym: "PAAO",
    answers: ["Practicality", "Appropriateness in relation to the learners", "Activity / Suitability", "Objective-matching"]
  },
  {
    id: 18,
    question: "He put importance to human emotions, based on love and trust.",
    answers: ["Abraham Maslow"]
  },
  {
    id: 19,
    question: "Give at least 4 axioms.",
    answers: [
      "Curriculum change is inevitable, necessary, and desirable.",
      "Curriculum is a product of its time.",
      "Curriculum change depends on people who will implement the change.",
      "Curriculum development is a cooperative group activity."
    ]
  },
  {
    id: 20,
    question: "Major components of curriculum design or syllabus",
    acronym: "ILO, SMC, TLM, AE",
    answers: ["Intended Learning Outcomes", "Subject Matter or Content", "Teaching and Learning Methods", "Assessment Evaluation"]
  },
  {
    id: 21,
    question: "The key influence in this curriculum design is Abraham Maslow and Carl Rogers.",
    answers: ["Humanistic Psychology"]
  },
  {
    id: 22,
    question: "It is a process of mapping the curricular program or syllabus against established standards.",
    answers: ["Curriculum Quality Audit (CQA)"]
  },
  {
    id: 23,
    question: "PPST stands for what?",
    answers: ["Philippine Professional Standards for Teachers"]
  },
  {
    id: 24,
    question: "Categories of curriculum change",
    acronym: "SARPV",
    answers: ["Substitution", "Alteration", "Restructuring", "Perturbations", "Value Orientation"]
  },
  {
    id: 25,
    question: "Process that ensures that the curriculum brings about something different and better than before in the desired learning outcomes.",
    answers: ["Change Process"]
  },
  {
    id: 26,
    question: "Revised Bloom's by Anderson",
    acronym: "RUAAEC",
    answers: ["Remembering", "Understanding", "Applying", "Analyzing", "Evaluating", "Creating"]
  },
  {
    id: 27,
    question: "Levels of knowledge",
    acronym: "FCPM",
    answers: ["Factual Knowledge", "Conceptual Knowledge", "Procedural Knowledge", "Metacognitive Knowledge"]
  },
  {
    id: 28,
    question: "He introduced tasking in the formulation of objectives.",
    answers: ["Robert Gagne"]
  },
  {
    id: 29,
    question: "He emphasized social studies and suggested that the teacher plans curriculum in advance.",
    answers: ["Harold Rugg"]
  },
  {
    id: 30,
    question: "Give at least 5 criteria in the use of visual aid.",
    answers: ["Lettering Style or font", "Use of capitals", "Lettering Colors", "Lettering Size", "Spacing Between Letters"]
  },
  {
    id: 31,
    question: "PAFTE stands for what?",
    answers: ["Philippine Association for Teachers and Educators"]
  },
  {
    id: 32,
    question: "SUCTEA stands for what?",
    answers: ["State Universities and Colleges Teacher Educators Association"]
  },
  {
    id: 33,
    question: "Stages of the CIPP model",
    answers: ["Context Evaluation", "Input Evaluation", "Process Evaluation", "Product Evaluation"]
  },
  {
    id: 34,
    question: "This test requires only one and one correct answer.",
    answers: ["Objective Test"]
  },
  {
    id: 35,
    question: "It is a tool that uses a scale in a number line as a basis to estimate numerical value of a performance or a product.",
    answers: ["Rating Scale"]
  },
  {
    id: 36,
    question: "It is known as the Enhanced Basic Education Act of 2013.",
    answers: ["Republic Act 10533"]
  },
  {
    id: 37,
    question: "TIMSS stands for what?",
    answers: ["Trends in International Mathematics and Science Scores"]
  },
  {
    id: 38,
    question: "Four tracks in senior high school",
    answers: ["Academic Track", "TechVoc Track", "Arts and Designs Track", "Sports Track"]
  },
  {
    id: 39,
    question: "HUMSS stands for what?",
    answers: ["Humanities and Social Sciences"]
  },
  {
    id: 40,
    question: "Four essential principles in OBE",
    acronym: "CDHE",
    answers: ["Principle 1: Clarity of Focus", "Principle 2: Designing Backwards", "Principle 3: High Expectations", "Principle 4: Expanded Opportunities"]
  },
  {
    id: 41,
    question: "Title of Degree in CMO 78 s. 2017",
    acronym: "BTLEd",
    answers: ["Bachelor of Technology and Livelihood Education"]
  },
  {
    id: 42,
    question: "Title of Degree in CMO 76 s. 2017",
    acronym: "BECED",
    answers: ["Bachelor of Early Childhood Education"]
  },
  {
    id: 43,
    question: "This is a combination of the F2F and the distance learning.",
    answers: ["Blended Learning / Flexible Learning"]
  },
  {
    id: 44,
    question: "A traditional delivery made where the teacher and the students are physically present to hold classes in a designated place.",
    answers: ["Face to face"]
  },
  {
    id: 45,
    question: "Five frames of thinking",
    acronym: "DSCRE",
    answers: ["The Disciplined Mind", "The Synthesizing Mind", "The Creating Mind", "The Respectful Mind", "The Ethical Mind"]
  }
];

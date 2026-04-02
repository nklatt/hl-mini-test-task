import { card_interaction_type, PrismaClient, role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const admin = await prisma.users.upsert({
    where: { phone: "+2341234567890" },
    update: {},
    create: {
      phone: "+2341234567890",
      first: "Admin",
      last: "User",
      role: role.admin,
    },
  });
  console.log("Created admin user:", admin.id);

  // Create learner user
  const learner = await prisma.users.upsert({
    where: { phone: "+2349876543210" },
    update: {},
    create: {
      phone: "+2349876543210",
      first: "Amara",
      last: "Nwosu",
      role: role.registered,
    },
  });
  console.log("Created learner user:", learner.id);

  // Create course
  const course = await prisma.courses.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Community Health Essentials",
      description:
        "A foundational course for community health workers covering key topics in primary healthcare.",
    },
  });
  console.log("Created course:", course.id);

  // Create Module 1
  const module1 = await prisma.modules.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Introduction to Hand Hygiene",
      order: 1,
      course_id: course.id,
    },
  });
  console.log("Created module 1:", module1.id);

  // Module 1 cards (10 cards with radio→next pattern)
  const m1Cards = [
    {
      title: "Why is hand hygiene important?",
      body: "Hand hygiene is one of the most effective ways to prevent the spread of infections. When should you wash your hands?",
      interaction_type: card_interaction_type.radio,
      options: [
        { label: "Before and after patient contact", correct: true },
        { label: "Only when hands are visibly dirty", correct: false },
        { label: "Once per day in the morning", correct: false },
        { label: "Only after using the toilet", correct: false },
      ],
      order: 1,
    },
    {
      title: "Hand hygiene prevents infection",
      body: "Proper hand hygiene prevents the transfer of microorganisms from your hands to patients, surfaces, and yourself. This is the foundation of infection prevention.",
      interaction_type: card_interaction_type.next,
      options: null,
      order: 2,
    },
    {
      title: "The 5 moments of hand hygiene",
      body: "According to WHO guidelines, which of the following is one of the 5 moments for hand hygiene?",
      interaction_type: card_interaction_type.radio,
      options: [
        { label: "Before touching a patient", correct: true },
        { label: "After eating a meal", correct: false },
        { label: "Before leaving the health facility", correct: false },
        { label: "After checking your phone", correct: false },
      ],
      order: 3,
    },
    {
      title: "Clean hands save lives",
      body: "Studies show that proper hand hygiene can reduce healthcare-associated infections by up to 50%. This is why it is the single most important thing a health worker can do.",
      interaction_type: card_interaction_type.next,
      options: null,
      order: 4,
    },
    {
      title: "How long should you wash your hands?",
      body: "For handwashing with soap and water to be effective, how long should the washing process take?",
      interaction_type: card_interaction_type.radio,
      options: [
        { label: "At least 20 seconds", correct: true },
        { label: "5 seconds", correct: false },
        { label: "1 minute", correct: false },
        { label: "As long as you like", correct: false },
      ],
      order: 5,
    },
    {
      title: "Soap and water vs hand sanitizer",
      body: "Both soap and water and alcohol-based hand sanitizer are effective for hand hygiene. Soap and water should be used when hands are visibly soiled or after contact with certain pathogens like C. difficile.",
      interaction_type: card_interaction_type.next,
      options: null,
      order: 6,
    },
    {
      title: "Using alcohol-based hand rub",
      body: "When using alcohol-based hand rub, what percentage of alcohol should the product contain to be effective?",
      interaction_type: card_interaction_type.radio,
      options: [
        { label: "60-80% alcohol", correct: true },
        { label: "20-30% alcohol", correct: false },
        { label: "100% alcohol", correct: false },
        { label: "Any percentage", correct: false },
      ],
      order: 7,
    },
    {
      title: "Proper technique matters",
      body: "The technique used when washing hands is just as important as the frequency. All surfaces must be covered, including the backs of hands, between fingers, and under nails.",
      interaction_type: card_interaction_type.next,
      options: null,
      order: 8,
    },
    {
      title: "Common barriers to hand hygiene",
      body: "Which of the following is a well-documented barrier to proper hand hygiene compliance among health workers?",
      interaction_type: card_interaction_type.radio,
      options: [
        { label: "Lack of accessible hand hygiene facilities", correct: true },
        { label: "Not knowing what hands are", correct: false },
        { label: "Having too much time available", correct: false },
        { label: "Using gloves correctly", correct: false },
      ],
      order: 9,
    },
    {
      title: "You've completed Hand Hygiene!",
      body: "Excellent work! You now understand the importance of hand hygiene, the 5 moments, proper technique, and common barriers. Apply these principles in your daily work to protect both yourself and the people in your care.",
      interaction_type: card_interaction_type.next,
      options: null,
      order: 10,
    },
  ];

  for (const card of m1Cards) {
    await prisma.cards.upsert({
      where: { id: card.order }, // approximate upsert by order
      update: {},
      create: {
        title: card.title,
        body: card.body,
        interaction_type: card.interaction_type,
        options: card.options ? card.options : undefined,
        order: card.order,
        module_id: module1.id,
      },
    });
  }
  console.log("Created module 1 cards");

  // Create Module 2
  const module2 = await prisma.modules.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Recognising Danger Signs",
      order: 2,
      course_id: course.id,
    },
  });
  console.log("Created module 2:", module2.id);

  // Module 2 cards (3 cards)
  const m2Cards = [
    {
      title: "What is a danger sign?",
      body: "A danger sign is a symptom or finding that indicates a patient may have a serious or life-threatening condition requiring urgent action. Which of the following is a general danger sign in a sick child?",
      interaction_type: card_interaction_type.radio,
      options: [
        { label: "Unable to drink or breastfeed", correct: true },
        { label: "Mild cough for 2 days", correct: false },
        { label: "Slight runny nose", correct: false },
        { label: "Playing normally", correct: false },
      ],
      order: 1,
    },
    {
      title: "Act quickly on danger signs",
      body: "When you identify a danger sign, urgent action is required. This may mean referral to a higher-level facility, immediate treatment, or both. Do not wait to see if the patient improves on their own.",
      interaction_type: card_interaction_type.next,
      options: null,
      order: 2,
    },
    {
      title: "Breathing difficulties",
      body: "Which of the following breathing patterns is a danger sign requiring urgent referral?",
      interaction_type: card_interaction_type.radio,
      options: [
        { label: "Chest indrawing", correct: true },
        {
          label: "Breathing rate of 25 breaths per minute in an adult",
          correct: false,
        },
        { label: "Slightly faster breathing after exercise", correct: false },
        { label: "Breathing through the nose", correct: false },
      ],
      order: 3,
    },
  ];

  for (const card of m2Cards) {
    await prisma.cards.upsert({
      where: { id: 10 + card.order }, // offset by 10 for module 2
      update: {},
      create: {
        title: card.title,
        body: card.body,
        interaction_type: card.interaction_type,
        options: card.options ? card.options : undefined,
        order: card.order,
        module_id: module2.id,
      },
    });
  }
  console.log("Created module 2 cards");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

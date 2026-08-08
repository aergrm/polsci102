import { Week, Assessment } from './types';

export const courseInfo = {
  courseCode: 'POL SCI 102',
  title: 'Introduction to International Relations',
  term: 'Spring 2027',
  dates: 'January 25 - May 21, 2027',
  credits: '3 undergraduate credits',
  prerequisites: 'None',
  format: 'In person; two meetings weekly',
  meetingPlace: 'To be announced',
  courseSite: 'Canvas',
  genEd: 'Social and Behavioral Science general education credit',
  
  instructor: {
    name: 'Ahmet Ergurum',
    department: 'Department of Political Science',
    institution: 'University of Wisconsin-Milwaukee',
    email: 'aergurum@uwm.edu',
    website: 'https://aergrm.github.io',
    officeHours: 'To be announced; also by appointment',
  },

  textbook: {
    authors: 'No Required Textbook',
    title: 'Short scholarly articles, primary documents, and research or policy reports',
    edition: 'Spring 2027',
    publisher: 'Canvas / UWM Libraries / Course Reserves',
    note: 'There is no required textbook and no book purchase is necessary. Required readings consist of short scholarly articles or excerpts, public primary documents, and brief research or policy reports linked through Canvas, UWM Libraries, or course reserves.',
  },

  description: `POL SCI 102 introduces students to the study of international relations, with particular attention to the foreign policies of states, military security, economic relations, and their consequences for the international system. The course is designed for students with no prior coursework in international relations. We begin with a short history of the modern international system before turning to the concepts scholars use to explain it. We will ask why wars begin, how states attempt to deter or coerce adversaries, why alliances form, why cooperation is difficult but possible, how domestic politics shapes foreign policy, and how trade, sanctions, institutions, human rights, migration, climate change, nuclear weapons, cyber operations, and artificial intelligence affect world politics. The goal is not to memorize a long list of events. The goal is to learn how to use concepts and evidence to explain them.`,

  centralQuestions: [
    'Why does conflict occur even when war is costly?',
    'When do deterrence, coercion, diplomacy, and reassurance work?',
    'How do leaders, institutions, public opinion, and bureaucracies shape foreign policy?',
    'When can international organizations and international law facilitate cooperation?',
    'How do trade, finance, development, and economic statecraft distribute gains and risks?',
    'How are nuclear weapons, cyber conflict, climate change, migration, and artificial intelligence changing international politics?'
  ],

  learningOutcomes: [
    'Explain major approaches to international relations, including realism, liberalism, constructivism, bargaining theory, and domestic-politics approaches.',
    'Identify major states, regions, institutions, and turning points in the modern international system and place contemporary events in basic historical and geographic context.',
    'Explain how interests, power, institutions, ideas, leaders, and domestic politics shape the behavior of states and nonstate actors.',
    'Apply theories of conflict and cooperation to historical and contemporary cases.',
    'Interpret basic maps, graphs, tables, and cross-national evidence used in the study of world politics.',
    'Compare competing explanations and assess what evidence would make one explanation more convincing than another.',
    'Construct a clear argument in writing and support it with credible evidence and appropriate citations.',
    'Participate in structured negotiation and reflect on the strategic and ethical consequences of policy choices.'
  ]
};

export const assessments: Assessment[] = [
  {
    name: 'Essential International Knowledge Quiz',
    weight: '5%',
    skills: 'Basic world geography, international institutions, major historical reference dates',
    description: 'A short early-semester quiz on basic geography, major international institutions, and a small set of historical reference points needed for later analysis. Practice materials are provided in advance.'
  },
  {
    name: 'Preparation Quizzes',
    weight: '10%',
    skills: 'Foundational concepts, reading comprehension, retrieval practice',
    description: 'Short Canvas quizzes on foundational concepts and required readings. The lowest two scores are dropped.'
  },
  {
    name: 'Engagement and Contribution',
    weight: '5%',
    skills: 'Prepared participation, small-group work, brief writing, peer feedback, simulations',
    description: 'Prepared participation in discussion, small-group work, brief writing, peer feedback, and simulations. Quality matters more than frequency.'
  },
  {
    name: 'Contemporary Connections',
    weight: '15%',
    skills: 'Concept application, real-world events, evidence evaluation',
    description: 'Three short assignments (about 500-650 words each) that apply one course concept to a current international event and identify evidence that supports or challenges the application.'
  },
  {
    name: 'Analytical Memo',
    weight: '15%',
    skills: 'Theoretical comparison, causal reasoning, structured writing',
    description: 'A 900-1,100 word memo comparing two competing explanations of one international event or policy decision.'
  },
  {
    name: 'Midterm Examination',
    weight: '20%',
    skills: 'Concept identification, short applications, comparative essay writing',
    description: 'Concept identification, short applications, and one comparative essay.'
  },
  {
    name: 'Crisis Bargaining Simulation and Debrief',
    weight: '10%',
    skills: 'Multilateral negotiation, strategic reasoning, written debrief reflection',
    description: 'Team preparation, structured negotiation, and a 600-750 word individual reflection.'
  },
  {
    name: 'Final Policy Brief',
    weight: '20%',
    skills: 'Problem definition, concept application, evaluating policy alternatives, policy writing',
    description: 'A 1,300-1,500 word brief that defines a problem, applies course concepts, evaluates options, and recommends a course of action.'
  }
];

export const scheduleData: Week[] = [
  {
    week: 1,
    dates: 'Jan. 25-29',
    part: 'PART I. FOUNDATIONS OF INTERNATIONAL RELATIONS',
    title: 'What Is International Relations? Actors, Sovereignty, and Levels of Analysis',
    requiredReadings: [
      'United Nations. 1945. Charter of the United Nations, Preamble and Articles 1-2 (short primary source).'
    ],
    recommendedReadings: [
      'Singer, J. David. 1961. "The Level-of-Analysis Problem in International Relations." World Politics 14(1): 77-92.'
    ],
    inClassAndAssignments: 'In Class: map-and-actors exercise; levels-of-analysis diagnosis using one current event. Essential international knowledge study guide released.'
  },
  {
    week: 2,
    dates: 'Feb. 1-5',
    part: 'PART I. FOUNDATIONS OF INTERNATIONAL RELATIONS',
    title: 'How Did We Get Here? World Wars, Cold War, and the Contemporary International Order',
    requiredReadings: [
      'Kennan, George F. 1947. "The Sources of Soviet Conduct." Foreign Affairs. Selected excerpt, approximately 5 pages.'
    ],
    recommendedReadings: [
      'Ikenberry, G. John. 2001. After Victory. Introduction.'
    ],
    inClassAndAssignments: 'In Class: build a 1914-present timeline in teams; connect World War II, the Cold War, decolonization, and 1991 to institutions students encounter today. Essential international knowledge quiz.',
    hasAssignment: true,
    assignmentName: 'Essential International Knowledge Quiz'
  },
  {
    week: 3,
    dates: 'Feb. 8-12',
    part: 'PART I. FOUNDATIONS OF INTERNATIONAL RELATIONS',
    title: 'How Do IR Scholars Explain World Politics? Realism, Liberalism, and Constructivism',
    requiredReadings: [
      'Snyder, Jack. 2004. "One World, Rival Theories." Foreign Policy 145: 52-62.'
    ],
    recommendedReadings: [
      'Mearsheimer, John J. 2001. The Tragedy of Great Power Politics. "Anarchy and the Struggle for Power," selected excerpt.',
      'Keohane, Robert O. 1984. After Hegemony. Selected excerpt; Wendt, Alexander. 1992. "Anarchy Is What States Make of It." International Organization 46(2): 391-425.'
    ],
    inClassAndAssignments: 'In Class: three-theories exercise: groups use realism, liberalism, and constructivism to explain the same contemporary event, then identify what evidence would distinguish the explanations.'
  },
  {
    week: 4,
    dates: 'Feb. 15-19',
    part: 'PART II. CONFLICT AND INTERNATIONAL SECURITY',
    title: 'Anarchy, Power, and the Security Dilemma',
    requiredReadings: [
      'Jervis, Robert. 1978. "Cooperation under the Security Dilemma." World Politics 30(2): 167-177 only.'
    ],
    recommendedReadings: [
      'Waltz, Kenneth N. 1988. "The Origins of War in Neorealist Theory." Journal of Interdisciplinary History 18(4): 615-628.'
    ],
    inClassAndAssignments: 'In Class: Prisoner\'s Dilemma/security-dilemma game; distinguish intentions from capabilities; Preparation Quiz 1.',
    hasAssignment: true,
    assignmentName: 'Preparation Quiz 1'
  },
  {
    week: 5,
    dates: 'Feb. 22-26',
    part: 'PART II. CONFLICT AND INTERNATIONAL SECURITY',
    title: 'Why Does War Occur? Bargaining, Information, and Commitment Problems',
    requiredReadings: [
      'Fearon, James D. 1995. "Rationalist Explanations for War." International Organization 49(3): 379-390 only.'
    ],
    recommendedReadings: [
      'Powell, Robert. 2006. "War as a Commitment Problem." International Organization 60(1): 169-203.'
    ],
    inClassAndAssignments: 'In Class: bargaining game with private information; identify information, commitment, and indivisibility mechanisms in short historical cases. Contemporary Connection 1 assigned.',
    hasAssignment: true,
    assignmentName: 'Contemporary Connection 1 Assigned'
  },
  {
    week: 6,
    dates: 'Mar. 1-5',
    part: 'PART II. CONFLICT AND INTERNATIONAL SECURITY',
    title: 'Deterrence, Compellence, and Coercive Diplomacy',
    requiredReadings: [
      'Schelling, Thomas C. 1966. Arms and Influence. Chapter 1, "The Diplomacy of Violence," pp. 1-10 only.'
    ],
    recommendedReadings: [
      'George, Alexander L. 1991. Forceful Persuasion: Coercive Diplomacy as an Alternative to War. Chapter 1.',
      'Freedman, Lawrence. 1998. "Strategic Coercion." In Strategic Coercion: Concepts and Cases. Oxford University Press.'
    ],
    inClassAndAssignments: 'In Class: coercive-bargaining exercise; students classify real policy statements as deterrence, compellence, reassurance, or simple punishment. Contemporary Connection 1 due.',
    hasAssignment: true,
    assignmentName: 'Contemporary Connection 1 Due'
  },
  {
    week: 7,
    dates: 'Mar. 8-12',
    part: 'PART II. CONFLICT AND INTERNATIONAL SECURITY',
    title: 'Alliances and the Balance of Power',
    requiredReadings: [
      'Walt, Stephen M. 1987. The Origins of Alliances, pp. 17-21 and 27-31 only.',
      'North Atlantic Treaty. 1949. Articles 4-5 (short primary source).'
    ],
    recommendedReadings: [
      'Olson, Mancur, and Richard Zeckhauser. 1966. "An Economic Theory of Alliances." Review of Economics and Statistics 48(3): 266-279.'
    ],
    inClassAndAssignments: 'In Class: alliance-formation exercise; students decide whom to ally with under changing distributions of power, threat, and reliability. Analytical memo prompt released.'
  },
  {
    week: 8,
    dates: 'Mar. 15-19',
    part: 'PART II. CONFLICT AND INTERNATIONAL SECURITY',
    title: 'Nuclear Weapons, Deterrence, and Midterm Synthesis',
    requiredReadings: [
      'Tannenwald, Nina. 1999. "The Nuclear Taboo: The United States and the Normative Basis of Nuclear Non-Use." International Organization 53(3): 433-445 only.',
      'Treaty on the Non-Proliferation of Nuclear Weapons, Articles I, II, and VI (short primary source).'
    ],
    recommendedReadings: [
      'Sagan, Scott D., and Kenneth N. Waltz. 1995. The Spread of Nuclear Weapons: A Debate. Selected chapters.'
    ],
    inClassAndAssignments: 'In Class: nuclear-crisis decision exercise and cumulative review; Midterm examination.',
    hasAssignment: true,
    assignmentName: 'Midterm Examination'
  },
  {
    week: 9,
    dates: 'Mar. 29 - Apr. 2',
    part: 'PART III. DOMESTIC POLITICS AND INTERNATIONAL COOPERATION',
    title: 'Leaders, Regimes, Public Opinion, and Foreign Policy',
    requiredReadings: [
      'Kahneman, Daniel, and Jonathan Renshon. 2007. "Why Hawks Win." Foreign Policy 158: 34-38.'
    ],
    recommendedReadings: [
      'Weeks, Jessica L. P. 2012. "Strongmen and Straw Men: Authoritarian Regimes and the Initiation of International Conflict." American Political Science Review 106(2): 326-347.',
      'Putnam, Robert D. 1988. "Diplomacy and Domestic Politics: The Logic of Two-Level Games." International Organization 42(3): 427-460.'
    ],
    inClassAndAssignments: 'In Class: leader-adviser decision exercise on risk and loss aversion; compare how regime type and domestic audiences can constrain foreign policy. Analytical memo due.',
    hasAssignment: true,
    assignmentName: 'Analytical Memo Due'
  },
  {
    week: 10,
    dates: 'Apr. 5-9',
    part: 'PART III. DOMESTIC POLITICS AND INTERNATIONAL COOPERATION',
    title: 'International Institutions, Law, and Cooperation',
    requiredReadings: [
      'Keohane, Robert O. 1998. "International Institutions: Can Interdependence Work?" Foreign Policy 110: 82-96.',
      'United Nations. 1945. Charter of the United Nations, Articles 23-27 and 39-42 (short primary source).'
    ],
    recommendedReadings: [
      'Mearsheimer, John J. 1994/95. "The False Promise of International Institutions." International Security 19(3): 5-49.'
    ],
    inClassAndAssignments: 'In Class: UN Security Council negotiation; collective-action and veto exercise; Preparation Quiz 2.',
    hasAssignment: true,
    assignmentName: 'Preparation Quiz 2'
  },
  {
    week: 11,
    dates: 'Apr. 12-16',
    part: 'PART IV. INTERNATIONAL POLITICAL ECONOMY',
    title: 'Trade, Globalization, and Economic Statecraft',
    requiredReadings: [
      'Rodrik, Dani. 2001. "Trading in Illusions." Foreign Policy 123: 55-62.',
      'World Trade Organization. "What We Stand For" (brief public overview).'
    ],
    recommendedReadings: [
      'Farrell, Henry, and Abraham L. Newman. 2019. "Weaponized Interdependence: How Global Economic Networks Shape State Coercion." International Security 44(1): 42-79.'
    ],
    inClassAndAssignments: 'In Class: trade-distribution exercise followed by a sanctions-design exercise using a simple network diagram. Contemporary Connection 2 assigned.',
    hasAssignment: true,
    assignmentName: 'Contemporary Connection 2 Assigned'
  },
  {
    week: 12,
    dates: 'Apr. 19-23',
    part: 'PART IV. INTERNATIONAL POLITICAL ECONOMY',
    title: 'Development, Inequality, and the Global Economy',
    requiredReadings: [
      'Sachs, Jeffrey D. 2005. "The Development Challenge." Foreign Affairs 84(2): 78-90.'
    ],
    recommendedReadings: [
      'Moyo, Dambisa. 2009. "Why Foreign Aid Is Hurting Africa." Wall Street Journal, March 21.',
      'Acemoglu, Daron. 2003. "Root Causes: A Historical Approach to Assessing the Role of Institutions in Economic Development." Finance & Development 40(2): 27-30.'
    ],
    inClassAndAssignments: 'In Class: development-data lab using GDP per capita, life expectancy, and inequality indicators; compare institutional, geographic, and international explanations. Contemporary Connection 2 due.',
    hasAssignment: true,
    assignmentName: 'Contemporary Connection 2 Due'
  },
  {
    week: 13,
    dates: 'Apr. 26-30',
    part: 'PART V. GLOBAL AND EMERGING CHALLENGES',
    title: 'Human Rights, Migration, and Humanitarian Intervention',
    requiredReadings: [
      'United Nations. 1948. Universal Declaration of Human Rights (short primary source).',
      'Evans, Gareth, and Mohamed Sahnoun. 2002. "The Responsibility to Protect." Foreign Affairs 81(6): selected pp. 99-108.'
    ],
    recommendedReadings: [
      'Keck, Margaret E., and Kathryn Sikkink. 1999. "Transnational Advocacy Networks in International and Regional Politics." International Social Science Journal 51(159): 89-101.'
    ],
    inClassAndAssignments: 'In Class: humanitarian-intervention mini-simulation; identify competing legal, strategic, and ethical claims. Crisis bargaining simulation roles released.'
  },
  {
    week: 14,
    dates: 'May 3-7',
    part: 'PART V. GLOBAL AND EMERGING CHALLENGES',
    title: 'Climate Change and the Problem of Collective Action',
    requiredReadings: [
      'Hardin, Garrett. 1968. "The Tragedy of the Commons." Science 162(3859): 1243-1248.',
      'Intergovernmental Panel on Climate Change. 2023. AR6 Synthesis Report: Summary for Policymakers, selected pp. 4-8.'
    ],
    recommendedReadings: [
      'Nordhaus, William. 2015. "Climate Clubs: Overcoming Free-Riding in International Climate Policy." American Economic Review 105(4): 1339-1370.'
    ],
    inClassAndAssignments: 'In Class: climate collective-action negotiation; multilateral crisis bargaining simulation; individual debrief assigned. Contemporary Connection 3 assigned.',
    hasAssignment: true,
    assignmentName: 'Contemporary Connection 3 Assigned'
  },
  {
    week: 15,
    dates: 'May 10-12',
    part: 'PART V. GLOBAL AND EMERGING CHALLENGES',
    title: 'Cyber Conflict, Artificial Intelligence, and the Future of World Order',
    requiredReadings: [
      'Lindsay, Jon R. 2013. "Stuxnet and the Limits of Cyber Warfare." Security Studies 22(3): 365-376 only.',
      'United Nations High-level Advisory Body on Artificial Intelligence. 2024. Governing AI for Humanity, Executive Summary only.'
    ],
    recommendedReadings: [
      'Ikenberry, G. John. 2018. "The End of Liberal International Order?" International Affairs 94(1): 7-23.'
    ],
    inClassAndAssignments: 'In Class: technology-and-security scenarios; course synthesis: which theories travel best across old and new problems? Simulation debrief and Contemporary Connection 3 due. Final policy brief workshop.',
    hasAssignment: true,
    assignmentName: 'Simulation Debrief & Contemporary Connection 3 Due'
  }
];

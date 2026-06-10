import { ZliideLogo, AdtractionLogo, BusinessAcademyLogo } from '../components/home/WorkedAtLogos'

// Single source of truth for the three recommendations — imported by BOTH the
// Home testimonials section and the About page, so the two can never drift
// apart again (they used to: About had a wall-of-text string + no logos).
// `text` is an array of paragraphs (natural reading rhythm, not one block);
// logos are the theme-aware inline SVGs. Verbatim, real recommendations.
export const TESTIMONIALS = [
  {
    recommender: 'Morten Møgelmose',
    title: 'CEO',
    company: 'Zliide',
    logoNode: <ZliideLogo />,
    text: [
      'Simon has in his work for Zliide been focusing on the UI and UX of the Zliide platform consisting of several elements with various user journeys.',
      "In his work, Simon has shown an eager to learn the aspects of the company's product and customer journeys in order to find ways to improve it. Simon has worked along an experienced tech team where he quickly found his place and contributed to the overall product.",
      'Simon is characterized by his positive energy and willingness to learn. Therefore, Simon has my full recommendation.',
    ],
  },
  {
    recommender: 'Frej Korsgaard',
    title: 'Head of Tech',
    company: 'Adtraction',
    logoNode: <AdtractionLogo />,
    text: [
      "It's my pleasure to recommend Simon Knudsen as a future employee of your company. I have been working with Simon for 1,5 years at Adservice where I'm managing the tech department.",
      "Simon was filling the position of Design Student Worker and also had an internship at Adservice. He delivered satisfying designs and also assisted in frontend implementation. Here he showed skill, diversity and overall delivered good results. He's proactive, quality aware and a great guy.",
      "I'm positive that Simon's skills and personal qualities will make him an asset at your company, as he was at Adservice. Simon has my recommendations, and I hope this letter can assist you in adding him to your team. Feel free to contact me if you have any questions regarding the recommendation.",
    ],
  },
  {
    recommender: 'Maria Louise Bendixen',
    title: 'Lecturer',
    company: 'Business Academy Aarhus',
    logoNode: <BusinessAcademyLogo />,
    text: [
      'Simon has proven to be a very ambitious, curious, change-oriented and positive student. Both when it comes to individual projects and in larger group projects.',
      'He willingly takes on the role of leader, but is also very good at working as an integrated part of the group. He shows great understanding of how best to combine theory and practice. Not least in the UX/UI field, where he has also specialised further along the way.',
      'He often wants to know more, do more and look at both problem spaces and solutions from multiple angles to really find the right match between issues and solutions. At the same time, he has also taken on the role of tutor for our upcoming international team. He would bring value, teamwork and skills and I hope this recommendation shows that.',
    ],
  },
]

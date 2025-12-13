import { useEffect } from 'react'
import ProjectGrid from '../components/projects/ProjectGrid'
import { PrimaryButton, SecondaryButton } from '../components/buttons/Button'
import TestimonialCard from '../components/cards/TestimonialCard'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ScrollAnimation from '../components/animations/ScrollAnimation'

function Home() {
  useEffect(() => {
    const viewProjectsBtn = document.getElementById('view-projects-btn');
    const contactBtn = document.getElementById('contact-btn');
    
    if (viewProjectsBtn && contactBtn) {
      const width = viewProjectsBtn.offsetWidth;
      contactBtn.style.width = `${width}px`;
    }
  }, []);

  return (
    <div className="min-h-screen bg-surface-primary text-text-primary">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 mb-20">
        {/* Large Avatar */}
        <div className="w-[148px] h-[148px] rounded-full overflow-hidden flex-shrink-0 bg-neutral-800 mb-6">
          <img 
            src="/simon-virtual.png" 
            alt="Simon Knudsen"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h1 className="text-2xl font-medium text-text-primary mb-6 text-center">
          Simon Knudsen
        </h1>

        {/* Description */}
        <p className="text-5xl text-text-secondary text-center max-w-2xl mb-10 leading-none">
          Product Designer specialized in creating innovative and human-centered digital experiences
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex items-center gap-4">
          <PrimaryButton id="view-projects-btn">
            View projects
          </PrimaryButton>
          <SecondaryButton id="contact-btn">
            Contact
          </SecondaryButton>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full p-6 mb-20">
        <ProjectGrid />
      </section>

      {/* Testimonials Section */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          <ScrollAnimation>
            <h2 className="text-5xl text-text-primary mb-12">Testimonials</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              logo={null}
              recommender="Morten Møgelmose"
              title="CEO"
              company="Zliide"
              text="Simon has in his work for Zliide been focusing on the UI and UX of the Zliide platform consisting of several elements with various user journeys. In his work, Simon has shown an eager to learn the aspects of the company's product and customer journeys in order to find ways to improve it. Simon has worked along an experienced tech team where he quickly found his place and contributed to the overall product. Simon is characterized by his positive energy and willingness to learn. Therefore, Simon has my full recommendation."
            />
            <TestimonialCard
              logo={null}
              recommender="Frej Korsgaard"
              title="Head of Tech"
              company="Adservice"
              text="It's my pleasure to recommend Simon Knudsen as a future employee of your company. I have been working with Simon for 1,5 years at Adservice where I'm managing the tech department. Simon was filling the position of Design Student Worker and also had an internship at Adservice. He delivered satisfying designs and also assisted in frontend implementation. Here he showed skill, diversity and overall delivered good results. He's proactive, quality aware and a great guy. I'm positive that Simon's skills and personal qualities will make him an asset at your company, as he was at Adservice. Simon has my recommendations, and I hope this letter can assist you in adding him to your team. Feel free to contact me if you have any questions regarding the recommendation."
            />
            <TestimonialCard
              logo={null}
              recommender="Maria Louise Bendixen"
              title="Lecturer"
              company="Business Academy Aarhus"
              text="Simon has proven to be a very ambitious, curious, change-oriented and positive student. Both when it comes to individual projects and in larger group projects. He willingly takes on the role of leader, but is also very good at working as an integrated part of the group. He shows great understanding of how best to combine theory and practice. Not least in the UX/UI field, where he has also specialised further along the way. He often wants to know more, do more and look at both problem spaces and solutions from multiple angles to really find the right match between issues and solutions. At the same time, he has also taken on the role of tutor for our upcoming international team. He would bring value, teamwork and skills and I hope this recommendation shows that."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home


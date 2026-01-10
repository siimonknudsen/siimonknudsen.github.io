import Header from '../components/Header'
import Footer from '../components/Footer'
import TestimonialCard from '../components/cards/TestimonialCard'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import LogoGrid from '../components/grids/LogoGrid'
import ImageGrid from '../components/grids/ImageGrid'
import SkillCard from '../components/cards/SkillCard'

function About() {
  // Automatically load all logos from src/assets/logos/ folder
  // Just add your logo files to that folder - no need to update this code!
  // Supports: .png, .jpg, .jpeg, .svg, .webp
  const logoModules = import.meta.glob('../assets/logos/*.{png,jpg,jpeg,svg,webp}', { 
    eager: true,
    import: 'default'
  })
  
  // Convert imported modules to an array of logo URLs, sorted by filename
  const companies = Object.entries(logoModules)
    .map(([path, url]) => ({
      path,
      url,
      filename: path.split('/').pop()
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename))
    .map(item => item.url)

  // Automatically load all images from src/assets/about-images/ folder
  // Just add your images to that folder - no need to update this code!
  // Supports: .jpg, .jpeg, .png, .webp, .gif
  const imageModules = import.meta.glob('../assets/about-images/*.{jpg,jpeg,png,webp,gif}', { 
    eager: true,
    import: 'default'
  })
  
  // Convert imported modules to an array of image URLs, sorted by filename
  const aboutImages = Object.entries(imageModules)
    .map(([path, url]) => ({
      path,
      url,
      filename: path.split('/').pop()
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename))
    .map(item => item.url)

  const skills = [
    {
      title: 'UX Design',
      description: 'Crafting intuitive and seamless user experiences through research, wireframing, and user journey mapping to enhance customer satisfaction, ensuring products meet user needs, ultimately leading to increased user retention and loyalty.'
    },
    {
      title: 'UI Design',
      description: 'Creating visually appealing interfaces that enhance user interaction and engagement, elevating brand perception and user engagement, driving conversion rates and customer satisfaction.'
    },
    {
      title: 'Design Systems',
      description: 'Establishing consistent design language and guidelines to ensure cohesive brand experiences, streamlining development processes, ensuring consistency and scalability across products, reducing time to market and development costs.'
    },
    {
      title: 'Prototyping',
      description: 'Building interactive prototypes to visualize and test design concepts before implementation, minimizing development risks by validating ideas early, saving time and resources while improving the quality of the final product.'
    },
    {
      title: 'UX Research',
      description: 'Conducting in-depth research to understand user needs, behaviors, and preferences, providing actionable insights into user behaviors and preferences, enabling companies to make informed decisions and prioritize features that matter most.'
    },
    {
      title: 'User Testing',
      description: 'Gathering feedback from real users to validate design decisions and improve usability, identifying usability issues and opportunities for improvement, resulting in higher conversion rates, lower churn, and increased customer satisfaction.'
    },
    {
      title: 'UX Writing',
      description: 'Crafting clear and concise content that guides users and enhances their experience, enhancing user comprehension and engagement, leading to clearer communication, improved task completion rates, and reduced support costs.'
    },
    {
      title: 'Frontend Development',
      description: 'Translating design concepts into functional web interfaces using HTML, CSS, and JavaScript, delivering seamless user experiences across devices, improving accessibility, and increasing customer satisfaction and retention.'
    }
  ]

  return (
    <div className="min-h-screen bg-surface-color-primary text-color-primary">
      <Header />

      {/* First Section - Headshot and Introduction */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto flex flex-col items-center">
          {/* Headshot */}
          <ScrollAnimation>
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden flex-shrink-0 bg-neutral-800 mb-8">
              <img 
                src={`${import.meta.env.BASE_URL}simon-virtual.png`} 
                alt="Simon Knudsen"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollAnimation>

          {/* Introduction Text */}
          <ScrollAnimation>
            <p className="text-[16px] text-color-secondary font-normal leading-[1.2] text-center max-w-3xl">
              I'm a Product Designer who's passionate about human psychology within digital products. I'm experienced in crafting beautiful and user friendly designs that solves real business problems. I'm specialized within UX Design, UI Design & Design Systems.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Second Section - Mission Statement */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto bg-surface-color-secondary h-[700px] rounded-lg flex items-center justify-center">
          <ScrollAnimation>
            <p className="text-5xl font-medium text-color-primary text-center leading-none max-w-[23ch]">
              Making the world of digital products more user friendly, one product at a time.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Third Section - Companies */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          {/* Companies Section */}
          <div>
            <ScrollAnimation>
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Companies i've done design for</h2>
            </ScrollAnimation>
            <LogoGrid logos={companies} columns={7} gap="1" />
          </div>
        </div>
      </section>

      {/* Fourth Section - Detailed Skills */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          <ScrollAnimation>
            <h2 className="text-[18px] font-medium text-color-primary mb-8">Skills</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                title={skill.title}
                description={skill.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fifth Section - Testimonials */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          <ScrollAnimation>
            <h2 className="text-5xl text-color-primary mb-12">Testimonials</h2>
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

      {/* Sixth Section - Pictures */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          <ScrollAnimation>
            <h2 className="text-5xl text-color-primary mb-12">A Picture Is Worth a Thousand Words</h2>
          </ScrollAnimation>
          <ImageGrid images={aboutImages} columns={4} gap="1" aspectRatio="9/16" />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About


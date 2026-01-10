import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/animations/ScrollAnimation'
import { PrimaryButton, SecondaryButton } from '../components/buttons/Button'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectTag from '../components/projects/ProjectTag'
import TestimonialCard from '../components/cards/TestimonialCard'
import Avatar from '../components/Avatar'
import Location from '../components/Location'
import ThemeToggle from '../components/ThemeToggle'
import Section from '../components/Section'
import Heading from '../components/typography/Heading'
import BodyText from '../components/typography/BodyText'
import LogoGrid from '../components/grids/LogoGrid'
import ImageGrid from '../components/grids/ImageGrid'
import SkillCard from '../components/cards/SkillCard'

function StyleGuide() {
  return (
    <div className="min-h-screen bg-surface-color-primary text-color-primary">
      <Header />

      {/* Design Tokens Section */}
      <section className="w-full p-6 mb-20">
        <div className="max-w-[1920px] mx-auto">
          <ScrollAnimation>
            <h1 className="text-5xl font-medium text-color-primary mb-12">Style Guide</h1>
          </ScrollAnimation>

          {/* Color Tokens */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Color Tokens</h2>
              
              {/* Surface Colors */}
              <div className="mb-8">
                <h3 className="text-[16px] font-medium text-color-primary mb-4">Surface Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-surface-color-primary border border-color-on-primary rounded-lg p-4">
                    <div className="w-full h-20 bg-surface-color-primary rounded mb-3 border border-color-on-primary"></div>
                    <p className="text-[14px] font-medium text-color-primary mb-1">Surface Primary</p>
                    <p className="text-[13px] text-color-secondary">var(--surface-color-primary)</p>
                  </div>
                  <div className="bg-surface-color-primary border border-color-on-primary rounded-lg p-4">
                    <div className="w-full h-20 bg-surface-color-secondary rounded mb-3 border border-color-on-primary"></div>
                    <p className="text-[14px] font-medium text-color-primary mb-1">Surface Secondary</p>
                    <p className="text-[13px] text-color-secondary">var(--surface-color-secondary)</p>
                  </div>
                  <div className="bg-surface-color-primary border border-color-on-primary rounded-lg p-4">
                    <div className="w-full h-20 bg-surface-color-tertiary rounded mb-3 border border-color-on-primary"></div>
                    <p className="text-[14px] font-medium text-color-primary mb-1">Surface Tertiary</p>
                    <p className="text-[13px] text-color-secondary">var(--surface-color-tertiary)</p>
                  </div>
                </div>
              </div>

              {/* Text Colors */}
              <div className="mb-8">
                <h3 className="text-[16px] font-medium text-color-primary mb-4">Text Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-surface-color-primary border border-color-on-primary rounded-lg p-4">
                    <p className="text-[16px] font-medium text-color-primary mb-2">Text Primary</p>
                    <p className="text-[13px] text-color-secondary">var(--text-color-primary)</p>
                  </div>
                  <div className="bg-surface-color-primary border border-color-on-primary rounded-lg p-4">
                    <p className="text-[16px] font-medium text-color-secondary mb-2">Text Secondary</p>
                    <p className="text-[13px] text-color-secondary">var(--text-color-secondary)</p>
                  </div>
                  <div className="bg-surface-color-primary border border-color-on-primary rounded-lg p-4">
                    <p className="text-[16px] font-medium text-color-tertiary mb-2">Text Tertiary</p>
                    <p className="text-[13px] text-color-secondary">var(--text-color-tertiary)</p>
                  </div>
                </div>
              </div>

              {/* Contrast Colors */}
              <div className="mb-8">
                <h3 className="text-[16px] font-medium text-color-primary mb-4">Contrast Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-surface-color-primary border border-color-on-primary rounded-lg p-4">
                    <div className="w-full h-20 bg-surface-color-contrast-primary rounded mb-3 border border-color-on-primary"></div>
                    <p className="text-[14px] font-medium text-color-primary mb-1">Surface Contrast Primary</p>
                    <p className="text-[13px] text-color-secondary">var(--surface-color-contrast-primary)</p>
                  </div>
                  <div className="bg-surface-color-primary border border-color-on-primary rounded-lg p-4">
                    <p className="text-[16px] font-medium text-color-contrast-primary mb-2">Text Contrast Primary</p>
                    <p className="text-[13px] text-color-secondary">var(--text-color-contrast-primary)</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Typography */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Typography</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-[16px] font-medium text-color-primary mb-2">Headings</h3>
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-5xl font-medium text-color-primary mb-2">Heading 1 (5xl, 500)</h1>
                      <p className="text-[13px] text-color-secondary">text-5xl font-medium</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-medium text-color-primary mb-2">Heading 2 (18px, 500)</h2>
                      <p className="text-[13px] text-color-secondary">text-[18px] font-medium</p>
                    </div>
                    <div>
                      <h3 className="text-[16px] font-medium text-color-primary mb-2">Heading 3 (16px, 500)</h3>
                      <p className="text-[13px] text-color-secondary">text-[16px] font-medium</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-color-primary mb-2">Body Text</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[16px] font-normal text-color-secondary mb-2">Body Text (16px, 400)</p>
                      <p className="text-[13px] text-color-secondary">text-[16px] font-normal</p>
                    </div>
                    <div>
                      <p className="text-[14px] font-normal text-color-secondary mb-2">Small Text (14px, 400)</p>
                      <p className="text-[13px] text-color-secondary">text-[14px] font-normal</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-normal text-color-secondary mb-2">Extra Small Text (13px, 400)</p>
                      <p className="text-[13px] text-color-secondary">text-[13px] font-normal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Buttons */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Buttons</h2>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton>Primary Button</PrimaryButton>
                <SecondaryButton>Secondary Button</SecondaryButton>
              </div>
            </div>
          </ScrollAnimation>

          {/* Tags/Chips */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Tags / Chips</h2>
              <div className="flex flex-wrap gap-2">
                <ProjectTag>UX Design</ProjectTag>
                <ProjectTag>UI Design</ProjectTag>
                <ProjectTag>Design System</ProjectTag>
                <ProjectTag>Prototyping</ProjectTag>
              </div>
            </div>
          </ScrollAnimation>

          {/* Cards */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Project Card</h2>
              <div className="max-w-md">
                <ProjectCard
                  id="example"
                  title="Example Project"
                  description="This is an example project card showing the design system in action."
                  tags={["UX Design", "UI Design", "Design System"]}
                />
              </div>
            </div>
          </ScrollAnimation>

          {/* Testimonial Card */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Testimonial Card</h2>
              <div className="max-w-md">
                <TestimonialCard
                  logo={null}
                  recommender="John Doe"
                  title="CEO"
                  company="Example Company"
                  text="This is an example testimonial card showing how testimonials are displayed in the design system."
                />
              </div>
            </div>
          </ScrollAnimation>

          {/* Avatar */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Avatar</h2>
              <div className="flex gap-8">
                <div>
                  <p className="text-[14px] text-color-secondary mb-4">Small</p>
                  <Avatar name="Simon Knudsen" title="Product Designer" size="small" />
                </div>
                <div>
                  <p className="text-[14px] text-color-secondary mb-4">Large</p>
                  <Avatar name="Simon Knudsen" title="Product Designer" size="large" />
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Location */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Location</h2>
              <Location />
            </div>
          </ScrollAnimation>

          {/* Theme Toggle */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Theme Toggle</h2>
              <ThemeToggle />
            </div>
          </ScrollAnimation>

          {/* Spacing Tokens */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Spacing Tokens</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[14px] text-color-secondary mb-2">Section Gap: 80px (mb-20)</p>
                  <div className="bg-surface-color-secondary h-20 w-full rounded"></div>
                </div>
                <div>
                  <p className="text-[14px] text-color-secondary mb-2">Section Padding: 24px (p-6)</p>
                  <div className="bg-surface-color-secondary p-6 rounded">
                    <div className="bg-surface-color-tertiary h-10 rounded"></div>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] text-color-secondary mb-2">Gap Sizes</p>
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      <div className="bg-surface-color-secondary w-8 h-8 rounded"></div>
                      <div className="bg-surface-color-secondary w-8 h-8 rounded"></div>
                      <span className="text-[13px] text-color-secondary ml-2">gap-1 (4px)</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-surface-color-secondary w-8 h-8 rounded"></div>
                      <div className="bg-surface-color-secondary w-8 h-8 rounded"></div>
                      <span className="text-[13px] text-color-secondary ml-2">gap-2 (8px)</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-surface-color-secondary w-8 h-8 rounded"></div>
                      <div className="bg-surface-color-secondary w-8 h-8 rounded"></div>
                      <span className="text-[13px] text-color-secondary ml-2">gap-4 (16px)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Border Tokens */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Border Tokens</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-color-primary border border-color-on-primary rounded-lg p-4">
                  <div className="w-full h-20 border border-color-on-primary rounded mb-3"></div>
                  <p className="text-[14px] font-medium text-color-primary mb-1">Border On Primary</p>
                  <p className="text-[13px] text-color-secondary">var(--border-color-on-primary)</p>
                </div>
                <div className="bg-surface-color-primary border border-color-primary rounded-lg p-4">
                  <div className="w-full h-20 border border-color-primary rounded mb-3"></div>
                  <p className="text-[14px] font-medium text-color-primary mb-1">Border Primary</p>
                  <p className="text-[13px] text-color-secondary">var(--border-color-primary)</p>
                </div>
                <div className="bg-surface-color-primary border border-color-secondary rounded-lg p-4">
                  <div className="w-full h-20 border border-color-secondary rounded mb-3"></div>
                  <p className="text-[14px] font-medium text-color-primary mb-1">Border Secondary</p>
                  <p className="text-[13px] text-color-secondary">var(--border-color-secondary)</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Reusable Components */}
          <ScrollAnimation>
            <div className="mb-16">
              <h2 className="text-[18px] font-medium text-color-primary mb-8">Reusable Components</h2>
              
              {/* Section Component */}
              <div className="mb-8">
                <h3 className="text-[16px] font-medium text-color-primary mb-4">Section</h3>
                <p className="text-[14px] text-color-secondary mb-4">Consistent section wrapper with padding and max-width</p>
                <Section>
                  <div className="bg-surface-color-secondary p-4 rounded">
                    <p className="text-[14px] text-color-secondary">Section content example</p>
                  </div>
                </Section>
              </div>

              {/* Heading Component */}
              <div className="mb-8">
                <h3 className="text-[16px] font-medium text-color-primary mb-4">Heading</h3>
                <div className="space-y-4">
                  <Heading level={1} size="xl">Heading XL (5xl)</Heading>
                  <Heading level={2} size="lg">Heading LG (18px)</Heading>
                  <Heading level={3} size="md">Heading MD (16px)</Heading>
                </div>
              </div>

              {/* BodyText Component */}
              <div className="mb-8">
                <h3 className="text-[16px] font-medium text-color-primary mb-4">BodyText</h3>
                <div className="space-y-4">
                  <BodyText size="base" color="primary">Body Text Base (16px) - Primary</BodyText>
                  <BodyText size="base" color="secondary">Body Text Base (16px) - Secondary</BodyText>
                  <BodyText size="sm" color="secondary">Body Text Small (14px) - Secondary</BodyText>
                  <BodyText size="xs" color="secondary">Body Text Extra Small (13px) - Secondary</BodyText>
                </div>
              </div>

              {/* LogoGrid Component */}
              <div className="mb-8">
                <h3 className="text-[16px] font-medium text-color-primary mb-4">LogoGrid</h3>
                <LogoGrid logos={Array(6).fill(null)} columns={6} gap="1" />
              </div>

              {/* ImageGrid Component */}
              <div className="mb-8">
                <h3 className="text-[16px] font-medium text-color-primary mb-4">ImageGrid</h3>
                <ImageGrid images={Array(4).fill(null)} columns={4} gap="1" aspectRatio="9/16" />
              </div>

              {/* SkillCard Component */}
              <div className="mb-8">
                <h3 className="text-[16px] font-medium text-color-primary mb-4">SkillCard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  <SkillCard 
                    title="UX Design"
                    description="Creating user-centered designs through research, wireframing, and prototyping."
                  />
                  <SkillCard 
                    title="UI Design"
                    description="Designing beautiful and functional interfaces that enhance user experience."
                  />
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default StyleGuide


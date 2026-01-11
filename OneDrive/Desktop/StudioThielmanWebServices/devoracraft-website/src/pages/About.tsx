import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Card from '../components/Card'

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const values = [
    {
      title: 'Professionalism',
      description: 'We are experts. Our work speaks. No compromises on quality.'
    },
    {
      title: 'Accessibility',
      description: 'Enterprise-grade solutions at startup prices.'
    },
    {
      title: 'Innovation',
      description: 'AI-powered solutions that give you a competitive edge.'
    },
    {
      title: 'Partnership',
      description: 'We\'re invested in your success. Personal support included.'
    }
  ]

  const team = [
    {
      name: 'Ruben Thielman',
      role: 'Founder & Developer',
      bio: '22-year-old passionate developer building web solutions. Dedicated to creating exceptional digital experiences with clean code, innovative solutions, and user-centered design.',
      photo: '/team-placeholder.jpg'
    }
  ]

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'Framer Motion',
    'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Figma'
  ]

  return (
    <div className="w-full pt-16 md:pt-20">
      {/* Hero */}
      <section className="section-padding bg-primary-white text-center">
        <div className="container-custom max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-h1 mb-6"
          >
            We're Here to Make Web Simple.
            <br />
            And Powerful.
          </motion.h1>
        </div>
      </section>

      {/* Founder Story */}
      <section ref={sectionRef} className="section-padding bg-gray-light">
        <div className="container-custom max-w-7xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-xs mx-auto md:mx-0">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h2 className="heading-h2 mb-2">Ruben Thielman</h2>
                <p className="text-body-large text-gray-600 mb-6">
                  22 years old, passionate developer
                </p>
              </div>
              <div className="text-body-large text-gray-700 space-y-6 leading-relaxed">
                <p>
                  I'm a software and web developer dedicated to creating exceptional digital experiences. 
                  With a focus on clean code, innovative solutions, and user-centered design, I bring ideas 
                  to life through technology.
                </p>
                <p>
                  My work combines technical expertise with creative problem-solving to deliver projects 
                  that make an impact. Whether it's building responsive web applications, developing 
                  robust software solutions, or crafting intuitive user interfaces, I approach each project 
                  with attention to detail and a commitment to excellence.
                </p>
              </div>
              
              {/* Skills Section */}
              <div className="pt-6">
                <h3 className="heading-h3 mb-8">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: index * 0.04 }}
                      whileHover={{ scale: 1.08, y: -4, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                      className="px-4 py-2.5 md:px-5 md:py-3 bg-white border-2 border-primary-black rounded-lg shadow-sm text-xs md:text-sm font-semibold uppercase tracking-wider cursor-default transition-colors hover:bg-primary-black hover:text-white"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-primary-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="heading-h2 mb-4">Meet the Team</h2>
            <p className="text-body-large text-gray-600">
              Young, passionate, dedicated to excellence
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="feature" className="text-center">
                  <div className="w-48 h-48 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                  <h3 className="heading-h3 mb-2">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 uppercase tracking-wider">{member.role}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-light">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="heading-h2">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="feature">
                  <h3 className="heading-h3 mb-3">{value.title}</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

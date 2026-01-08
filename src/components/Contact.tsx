import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Github, Linkedin } from 'lucide-react';
 import emailjs from "emailjs-com";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
   



  e.preventDefault();

  emailjs
    .send(
      "service_0yuwqjj",
      "your_template_id",
      formData,
      "RsI9y3CKW8VtLy3OC"
    )
    .then(
      () => {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      },
      (error) => {
        alert("❌ Failed to send. Try again.");
        console.error(error);
      }
    );


    // Handle form submission here
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'roshangawade160@gmail.com',
      href: 'https://mail.google.com/mail/u/0/#inbox?compose=new'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '91+ 8551879434',
      href: 'tel:+8551879434'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mumbai,India',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Roshan0612',
      color: 'hover:text-gray-300'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/roshan-gawade-469bb422a/',
      color: 'hover:text-gray-300'
    }
  ];

  return (
    <section id="contact" className="w-full py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-8 lg:px-16 xl:px-24">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-gray-700 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <div className="animate-fade-in-left stagger-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all duration-300 group-hover:border-gray-700\"
                    placeholder="Your Name"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all duration-300 group-hover:border-gray-700"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="group">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-3">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all duration-300 group-hover:border-gray-700"
                  placeholder="Project Discussion"
                />
              </div>
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all duration-300 resize-none group-hover:border-gray-700"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-gray-700 hover:from-teal-600 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl btn-hover"
              >
                <span>Send Message</span>
                <Send size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="animate-fade-in-right stagger-2">
            <div className="glass rounded-2xl p-10 h-full border border-gray-800/50 hover:border-teal-400/50 transition-all">
              <h3 className="text-2xl font-bold text-white mb-10">Let's Connect</h3>
              
              <div className="space-y-5 mb-10">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-900/60 transition-all duration-300 group border border-gray-800/30 hover:border-teal-400/30"
                    >
                      <div className="text-teal-400 group-hover:text-teal-300 transition-colors duration-300 p-2 bg-teal-400/10 rounded-lg group-hover:bg-teal-400/20">
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{info.label}</p>
                        <p className="text-white font-semibold group-hover:text-teal-300 transition-colors">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="border-t border-gray-800/50 pt-10">
                <h4 className="text-lg font-bold text-white mb-6">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`p-3 rounded-lg bg-gray-900/50 border border-gray-800/50 text-gray-400 ${social.color} transition-all duration-300 hover:bg-teal-400/10 hover:border-teal-400/50 transform hover:scale-110 hover:-translate-y-1`}
                        aria-label={social.label}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 p-6 bg-gradient-to-br from-teal-500/10 to-gray-800/10 rounded-xl border border-teal-400/20 hover:border-teal-400/40 transition-all">
                <p className="text-gray-300 text-sm leading-relaxed">
                  I'm always interested in hearing about new opportunities and exciting projects. 
                  Whether you're a company looking to hire, or you're a fellow developer wanting to collaborate, 
                  don't hesitate to reach out!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
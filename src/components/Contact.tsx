import React, { useState } from 'react';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin,
  MessageCircle,
  ArrowRight,
  Check,
  ExternalLink,
} from 'lucide-react';

type ContactMethod = 'linkedin' | 'whatsapp' | 'email' | 'phone';

const Contact = () => {
  const [activeMethod, setActiveMethod] =
    useState<ContactMethod | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSending(true);

    try {
      const response = await fetch(
        'https://formspree.io/f/xgooeayn',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSent(true);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSent(false);
      }, 4000);
    } catch (error) {
      console.error('Formspree error:', error);
      alert('Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleMethodClick = (method: ContactMethod) => {
    setActiveMethod(method);

    setTimeout(() => {
      document
        .getElementById(`contact-destination-${method}`)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
    }, 150);
  };

  const communicationMethods = [
    {
      id: 'linkedin' as ContactMethod,
      name: 'LinkedIn',
      description: 'Professional conversations',
      icon: Linkedin,
      color: '#0A66C2',
      softColor: 'rgba(10, 102, 194, 0.12)',
      borderColor: 'rgba(10, 102, 194, 0.38)',
      href: 'https://www.linkedin.com/in/roshan-gawade-469bb422a/',
      action: 'Open LinkedIn',
    },
    {
      id: 'whatsapp' as ContactMethod,
      name: 'WhatsApp',
      description: 'Quick conversations',
      icon: MessageCircle,
      color: '#25D366',
      softColor: 'rgba(37, 211, 102, 0.10)',
      borderColor: 'rgba(37, 211, 102, 0.30)',
      href: 'https://wa.me/918551879434',
      action: 'Start WhatsApp',
    },
    {
      id: 'email' as ContactMethod,
      name: 'Email',
      description: 'Projects & opportunities',
      icon: Mail,
      color: '#EA4335',
      softColor: 'rgba(234, 67, 53, 0.09)',
      borderColor: 'rgba(234, 67, 53, 0.28)',
      href: 'https://mail.google.com/mail/u/0/#inbox?compose=new',
      action: 'Send an Email',
    },
    {
      id: 'phone' as ContactMethod,
      name: 'Phone',
      description: 'Direct conversation',
      icon: Phone,
      color: '#6E9ACF',
      softColor: 'rgba(110, 154, 207, 0.10)',
      borderColor: 'rgba(110, 154, 207, 0.30)',
      href: 'tel:+918551879434',
      action: 'Call Me',
    },
  ];

  return (
    <section
      id="contact"
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-gray-950
        via-gray-900
        to-black
        py-20
        sm:py-24
      "
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(148,163,184,0.5) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(148,163,184,0.5) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '48px 48px',
            maskImage:
              'linear-gradient(to bottom, black, transparent 85%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black, transparent 85%)',
          }}
        />

        <div
          className="
            absolute
            -left-32
            top-[22%]
            h-56
            w-56
            rounded-full
            opacity-[0.035]
          "
          style={{
            background: '#2dd4bf',
            filter: 'blur(80px)',
          }}
        />

        <div
          className="
            absolute
            -right-24
            top-[58%]
            h-44
            w-44
            rounded-full
            opacity-[0.025]
          "
          style={{
            background: '#60a5fa',
            filter: 'blur(70px)',
          }}
        />

        <div
          className="
            absolute
            left-0
            right-0
            top-[48%]
            h-px
            bg-gradient-to-r
            from-transparent
            via-slate-500/[0.08]
            to-transparent
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1920px]
          px-3
          sm:px-8
          lg:px-16
          xl:px-24
        "
      >
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Get In{' '}
            <span className="gradient-text">
              Touch
            </span>
          </h2>

          <div
            className="
              mx-auto
              mb-8
              h-1
              w-20
              bg-gradient-to-r
              from-teal-400
              to-gray-700
            "
          />

          <p
            className="
              mx-auto
              max-w-2xl
              text-lg
              leading-relaxed
              text-gray-300
            "
          >
            Have a project, opportunity, or idea?
            Choose the way you would like to connect with me.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="mb-7 text-center">
            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-gray-500
              "
            >
              Choose how to connect
            </span>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {communicationMethods.map((method, index) => {
              const Icon = method.icon;

              const isActive =
                activeMethod === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() =>
                    handleMethodClick(method.id)
                  }
                  className="group relative text-left outline-none"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div
                    className={`
                      relative
                      min-h-[195px]
                      overflow-hidden
                      rounded-2xl
                      border
                      p-6
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? '-translate-y-2'
                          : 'hover:-translate-y-2'
                      }
                    `}
                    style={{
                      background: isActive
                        ? `linear-gradient(
                            145deg,
                            ${method.softColor},
                            rgba(17,24,39,0.96)
                          )`
                        : 'rgba(17, 24, 39, 0.88)',

                      borderColor: isActive
                        ? method.borderColor
                        : 'rgba(55,65,81,0.65)',

                      boxShadow: isActive
                        ? `
                          0 18px 35px rgba(0,0,0,0.28),
                          0 2px 8px ${method.softColor}
                        `
                        : '0 10px 25px rgba(0,0,0,0.18)',
                    }}
                  >
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-0
                        w-px
                        bg-gradient-to-b
                        from-white/[0.12]
                        via-white/[0.03]
                        to-transparent
                      "
                    />

                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        h-[2px]
                        w-full
                        origin-left
                        scale-x-0
                        transition-transform
                        duration-500
                        group-hover:scale-x-100
                      "
                      style={{
                        backgroundColor:
                          method.color,
                      }}
                    />

                    <div
                      className="
                        mb-7
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        transition-all
                        duration-300
                        group-hover:scale-110
                      "
                      style={{
                        color: method.color,
                        backgroundColor:
                          method.softColor,
                        borderColor:
                          method.borderColor,
                      }}
                    >
                      <Icon
                        size={23}
                        strokeWidth={1.8}
                      />
                    </div>

                    <h3
                      className="
                        mb-1
                        text-lg
                        font-bold
                        text-white
                      "
                    >
                      {method.name}
                    </h3>

                    <p
                      className="
                        mb-5
                        text-sm
                        text-gray-400
                      "
                    >
                      {method.description}
                    </p>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-semibold
                        text-gray-500
                        transition-colors
                        duration-300
                      "
                      style={{
                        color: isActive
                          ? method.color
                          : undefined,
                      }}
                    >
                      <span>
                        {isActive
                          ? 'Selected'
                          : method.action}
                      </span>

                      <ArrowRight
                        size={14}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </div>

                    <div
                      className={`
                        absolute
                        right-4
                        top-4
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? 'scale-100 opacity-100'
                            : 'scale-75 opacity-0'
                        }
                      `}
                      style={{
                        backgroundColor:
                          method.color,
                      }}
                    >
                      <Check
                        size={12}
                        strokeWidth={3}
                        className="text-white"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className="
              relative
              mx-auto
              h-24
              w-full
              max-w-4xl
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-0
                h-full
                w-px
                -translate-x-1/2
                bg-gradient-to-b
                from-gray-700/80
                via-gray-700/40
                to-transparent
              "
            />

            <div
              className={`
                absolute
                left-1/2
                top-0
                h-20
                w-px
                -translate-x-1/2
                origin-top
                bg-gradient-to-b
                from-teal-400
                via-teal-400/50
                to-transparent
                transition-all
                duration-700
                ${
                  activeMethod
                    ? 'scale-y-100 opacity-100'
                    : 'scale-y-0 opacity-0'
                }
              `}
            />

            <div
              className={`
                absolute
                bottom-0
                left-1/2
                h-2
                w-2
                -translate-x-1/2
                rounded-full
                bg-teal-400
                shadow-sm
                shadow-teal-400/40
                transition-all
                duration-700
                ${
                  activeMethod
                    ? 'scale-100 opacity-100'
                    : 'scale-0 opacity-0'
                }
              `}
            />
          </div>

          <div className="mx-auto max-w-3xl">
            {activeMethod ? (
              (() => {
                const method =
                  communicationMethods.find(
                    item =>
                      item.id === activeMethod
                  );

                if (!method) return null;

                const Icon = method.icon;

                return (
                  <div
                    id={`contact-destination-${method.id}`}
                    className="
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      bg-gray-900/95
                      p-6
                      transition-all
                      duration-500
                      sm:p-8
                    "
                    style={{
                      borderColor:
                        method.borderColor,

                      boxShadow: `
                        0 20px 45px rgba(0,0,0,0.28),
                        0 2px 8px ${method.softColor}
                      `,
                    }}
                  >
                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        h-full
                        w-[3px]
                      "
                      style={{
                        backgroundColor:
                          method.color,
                      }}
                    />

                    <div
                      className="
                        flex
                        flex-col
                        gap-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >
                        <div
                          className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                          "
                          style={{
                            color: method.color,
                            backgroundColor:
                              method.softColor,
                            borderColor:
                              method.borderColor,
                          }}
                        >
                          <Icon
                            size={26}
                            strokeWidth={1.8}
                          />
                        </div>

                        <div>
                          <p
                            className="
                              mb-1
                              text-xs
                              uppercase
                              tracking-wider
                              text-gray-500
                            "
                          >
                            Connecting through
                          </p>

                          <h3
                            className="
                              text-xl
                              font-bold
                              text-white
                            "
                          >
                            {method.name}
                          </h3>
                        </div>
                      </div>

                      <a
                        href={method.href}
                        target={
                          method.id === 'linkedin' ||
                          method.id === 'whatsapp'
                            ? '_blank'
                            : undefined
                        }
                        rel={
                          method.id === 'linkedin' ||
                          method.id === 'whatsapp'
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          rounded-lg
                          px-5
                          py-3
                          text-sm
                          font-semibold
                          text-white
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:brightness-110
                        "
                        style={{
                          backgroundColor:
                            method.color,
                        }}
                      >
                        {method.action}

                        <ExternalLink
                          size={15}
                        />
                      </a>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div
                className="
                  flex
                  justify-center
                  py-8
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    text-gray-500
                  "
                >
                  <span
                    className="
                      h-px
                      w-10
                      bg-gray-700
                    "
                  />

                  <span>
                    Select a connection above
                  </span>

                  <span
                    className="
                      h-px
                      w-10
                      bg-gray-700
                    "
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="
            mx-auto
            mt-24
            max-w-5xl
          "
        >
          <div className="mb-10 text-center">
            <p
              className="
                mb-3
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-gray-500
              "
            >
              Prefer email?
            </p>

            <h3
              className="
                text-2xl
                font-bold
                text-white
                sm:text-3xl
              "
            >
              Send me a message
            </h3>

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-sm
                text-gray-400
              "
            >
              Tell me what you are building,
              what you need, or simply say hello.
            </p>
          </div>

          <div
            className="
              grid
              overflow-hidden
              rounded-2xl
              border
              border-gray-800/70
              bg-gray-900/90
              lg:grid-cols-[0.8fr_1.2fr]
            "
            style={{
              boxShadow:
                '0 18px 45px rgba(0,0,0,0.24)',
            }}
          >
            <div
              className="
                relative
                overflow-hidden
                border-b
                border-gray-800/70
                p-7
                sm:p-9
                lg:border-b-0
                lg:border-r
              "
            >
              <div
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-px
                  bg-gradient-to-b
                  from-teal-400/30
                  via-teal-400/[0.05]
                  to-transparent
                "
              />

              <div className="relative">
                <div
                  className="
                    mb-8
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-teal-400/20
                    bg-teal-400/10
                    text-teal-400
                  "
                >
                  <Mail size={20} />
                </div>

                <h4
                  className="
                    mb-4
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  Let's start a conversation.
                </h4>

                <p
                  className="
                    text-sm
                    leading-7
                    text-gray-400
                  "
                >
                  Whether you have a full-stack
                  project, freelance opportunity,
                  developer role, or an interesting
                  idea, I'd be happy to hear about it.
                </p>

                <div
                  className="
                    mt-8
                    border-t
                    border-gray-800/70
                    pt-6
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-gray-400
                    "
                  >
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-green-400
                      "
                    />

                    Available for new opportunities
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-7 sm:p-9"
            >
              <div
                className="
                  grid
                  gap-5
                  sm:grid-cols-2
                "
              >
                <div>
                  <label
                    htmlFor="name"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-gray-300
                    "
                  >
                    Name *
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-800
                      bg-gray-950/80
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-gray-600
                      transition-all
                      duration-300
                      focus:border-teal-400
                      focus:ring-2
                      focus:ring-teal-400/20
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-gray-300
                    "
                  >
                    Email *
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-800
                      bg-gray-950/80
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-gray-600
                      transition-all
                      duration-300
                      focus:border-teal-400
                      focus:ring-2
                      focus:ring-teal-400/20
                    "
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-300
                  "
                >
                  Subject *
                </label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Discussion"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-800
                    bg-gray-950/80
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-gray-600
                    transition-all
                    duration-300
                    focus:border-teal-400
                    focus:ring-2
                    focus:ring-teal-400/20
                  "
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-300
                  "
                >
                  Message *
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-gray-800
                    bg-gray-950/80
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-white
                    outline-none
                    placeholder:text-gray-600
                    transition-all
                    duration-300
                    focus:border-teal-400
                    focus:ring-2
                    focus:ring-teal-400/20
                  "
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className={`
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.01]
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  ${
                    sent
                      ? 'bg-green-600'
                      : 'bg-gradient-to-r from-teal-400 to-gray-700 hover:from-teal-500 hover:to-gray-800'
                  }
                `}
              >
                {sending ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Sending...
                  </>
                ) : sent ? (
                  <>
                    <Check size={19} />
                    Message Sent
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div
          className="
            mx-auto
            mt-16
            max-w-5xl
            border-t
            border-gray-800/70
            pt-8
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-6
              sm:flex-row
            "
          >
            <a
              href="mailto:roshangawade160@gmail.com"
              className="
                flex
                items-center
                gap-3
                text-sm
                text-gray-400
                transition-colors
                hover:text-teal-400
              "
            >
              <Mail
                size={16}
                className="text-orange-400"
              />

              roshangawade160@gmail.com
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Roshan0612"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  rounded-lg
                  border
                  border-gray-800
                  bg-gray-900/70
                  p-3
                  text-gray-400
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-teal-400/30
                  hover:bg-teal-400/10
                  hover:text-teal-400
                "
              >
                <Github size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/roshan-gawade-469bb422a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  rounded-lg
                  border
                  border-gray-800
                  bg-gray-900/70
                  p-3
                  text-gray-400
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#0A66C2]/40
                  hover:bg-[#0A66C2]/10
                  hover:text-[#3d8bd5]
                "
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://leetcode.com/u/RoshanGawade10/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="
                  rounded-lg
                  border
                  border-gray-800
                  bg-gray-900/70
                  p-3
                  text-gray-400
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#FFA116]/40
                  hover:bg-[#FFA116]/10
                  hover:text-[#FFA116]
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M22.5 14.5c0-.83-.67-1.5-1.5-1.5h-7.17l-1.66-1.66a1.5 1.5 0 0 0-2.12 2.12l2.1 2.1a1.5 1.5 0 0 0 1.06.44H21c.83 0 1.5-.67 1.5-1.5ZM8.5 20.5a1.5 1.5 0 0 0 0-3H7.17a4.17 4.17 0 0 1 0-8.34H9.5a1.5 1.5 0 0 0 0-3H7.17a7.17 7.17 0 0 0 0 14.34H8.5Z" />
                  <path d="M15.5 3.5a1.5 1.5 0 0 0-2.12 0l-7.7 7.7a1.5 1.5 0 0 0 2.12 2.12l7.7-7.7a1.5 1.5 0 0 0 0-2.12Z" />
                </svg>
              </a>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
              "
            >
              <MapPin
                size={15}
                className="text-teal-400"
              />

              Mumbai, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
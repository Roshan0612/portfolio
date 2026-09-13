import React, { useState } from "react";
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    setStatus("sending");

    try {
      const response = await fetch(
        "https://formspree.io/f/xgooeayn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("success");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contacts = [
    {
      label: "LinkedIn",
      value: "Professional conversations",
      href: "https://www.linkedin.com/in/roshan-gawade-469bb422a/",
      icon: Linkedin,
    },
    {
      label: "WhatsApp",
      value: "Quick conversations",
      href: "https://wa.me/918551879434",
      icon: MessageCircle,
    },
    {
      label: "Email",
      value: "roshangawade160@gmail.com",
      href: "mailto:roshangawade160@gmail.com",
      icon: Mail,
    },
    {
      label: "Phone",
      value: "+91 85518 79434",
      href: "tel:+918551879434",
      icon: Phone,
    },
  ];

  return (
    <section id="contact" className="refined-section refined-contact">
      <div className="contact-glow" />

      <div className="refined-container">
        <div className="contact-heading">
          <div className="section-index">06 / CONTACT</div>

          <h2>
            Let's make
            <br />
            <span>something happen.</span>
          </h2>

          <p>
            Have a project, opportunity or interesting idea?
            <br />
            I'm always open to a good conversation.
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-details">
            <span className="eyebrow">Reach out directly</span>

            <div className="contact-links">
              {contacts.map((contact) => {
                const Icon = contact.icon;

                return (
                  <a
                    href={contact.href}
                    target={
                      contact.label === "Email" ||
                      contact.label === "Phone"
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      contact.label === "Email" ||
                      contact.label === "Phone"
                        ? undefined
                        : "noopener noreferrer"
                    }
                    key={contact.label}
                    className="contact-link"
                  >
                    <span className="contact-link-icon">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>

                    <span className="contact-link-text">
                      <strong>{contact.label}</strong>
                      <small>{contact.value}</small>
                    </span>

                    <ArrowUpRight size={16} />
                  </a>
                );
              })}
            </div>

            <div className="contact-location">
              <span>Based in</span>
              <strong>Mumbai, India</strong>
            </div>
          </div>

          <form className="contact-form" onSubmit={submitForm}>
            <div className="contact-form-heading">
              <span className="eyebrow">Start a conversation</span>
              <h3>Tell me about your idea.</h3>
            </div>

            <label>
              <span>Your name</span>

              <input
                required
                value={formData.name}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    name: event.target.value,
                  })
                }
                placeholder="John Doe"
              />
            </label>

            <label>
              <span>Email address</span>

              <input
                required
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  })
                }
                placeholder="john@example.com"
              />
            </label>

            <label>
              <span>Message</span>

              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    message: event.target.value,
                  })
                }
                placeholder="Tell me a little about the project..."
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
            >
              <span>
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent"
                  : "Send message"}
              </span>

              <span>
                <Send size={16} />
              </span>
            </button>

            {status === "success" && (
              <p className="form-success">
                Thanks — I'll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="form-error">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>

        <div className="contact-footer-line">
          <span>Available for selected opportunities</span>

          <span>Let's build something meaningful.</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
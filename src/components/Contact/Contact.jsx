// import React, { useState } from 'react';

// const contactLinks = [
//   {
//     icon: '📧',
//     label: 'Email',
//     value: 'reggie@finepointdesigns.com',
//     href: 'mailto:reggie@finepointdesigns.com',
//   },
//   {
//     icon: '💼',
//     label: 'LinkedIn',
//     value: 'linkedin.com/in/reggie-johnson',
//     href: 'https://www.linkedin.com/in/reggie-johnson',
//   },
//   {
//     icon: '🐙',
//     label: 'GitHub',
//     value: 'github.com/FinePo-nt',
//     href: 'https://github.com/FinePo-nt',
//   },
//   {
//     icon: '📍',
//     label: 'Location',
//     value: 'Charlotte, NC — Open to remote',
//     href: null,
//   },
// ];

// const Contact = () => {
//   const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   const handleSubmit = e => {
//     e.preventDefault();
//     // TODO: wire to Formspree or EmailJS
//     console.log('Contact form:', form);
//     setSubmitted(true);
//   };

//   return (
//     <section className="rj-contact" id="contact">
//       <p className="rj-label">Get in touch</p>
//       <h2 className="rj-section-title">Let's work together</h2>

//       <div className="rj-contact__inner">
//         <div>
//           <p className="rj-contact__sub">
//             I am open to full-time Platform Engineer and DevOps roles.
//             If you are building something interesting and need someone
//             who can own infrastructure end to end, reach out.
//           </p>

//           <div className="rj-contact__links">
//             {contactLinks.map(l => (
//               <div key={l.label}>
//                 {l.href ? (
//                   <a href={l.href} className="rj-contact__link" target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
//                     <span className="rj-contact__link-icon">{l.icon}</span>
//                     <div>
//                       <p className="rj-contact__link-label">{l.label}</p>
//                       <p className="rj-contact__link-value">{l.value}</p>
//                     </div>
//                     <span className="rj-contact__link-arrow">→</span>
//                   </a>
//                 ) : (
//                   <div className="rj-contact__link" style={{ cursor: 'default' }}>
//                     <span className="rj-contact__link-icon">{l.icon}</span>
//                     <div>
//                       <p className="rj-contact__link-label">{l.label}</p>
//                       <p className="rj-contact__link-value">{l.value}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           {submitted ? (
//             <div className="rj-contact__success">
//               <span className="rj-contact__success-icon">✓</span>
//               <p className="rj-contact__success-title">Message received.</p>
//               <p className="rj-contact__success-body">Thanks for reaching out. I will get back to you within one business day.</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="rj-contact__form">
//               <div className="rj-contact__row">
//                 <div className="rj-contact__field">
//                   <label htmlFor="name">Name</label>
//                   <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
//                 </div>
//                 <div className="rj-contact__field">
//                   <label htmlFor="email">Email</label>
//                   <input id="email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required />
//                 </div>
//               </div>
//               <div className="rj-contact__field">
//                 <label htmlFor="company">Company</label>
//                 <input id="company" name="company" type="text" placeholder="Where do you work?" value={form.company} onChange={handleChange} />
//               </div>
//               <div className="rj-contact__field">
//                 <label htmlFor="message">Message</label>
//                 <textarea id="message" name="message" placeholder="Tell me about the role or what you are building." value={form.message} onChange={handleChange} required />
//               </div>
//               <div className="rj-contact__submit">
//                 <button type="submit" className="rj-btn-primary">Send message</button>
//                 <span className="rj-contact__note">I reply within 24 hrs</span>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
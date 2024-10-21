import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './Contact.css'; // Import the CSS file

const Contact = () => {
  const teamMembers = [
    // {
    //   name: "Karan Kumar",
    //   role: "Frontend Developer",
    //   linkedin: "https://www.linkedin.com/in/karan-kumar-dev/",
    //   github: "https://github.com/kumar-karan",
    //   email: "karan.8080dev@gmail.com",
    //   imageUrl:
    //     "https://media.licdn.com/dms/image/D4E03AQFGeqAvTOXAIA/profile-displayphoto-shrink_800_800/0/1670087554519?e=1723075200&v=beta&t=B6HrEtOfWiD2F3HCkJsRW-_KcVpxG-ySH8CxOKoP1Uo",
    // },
    {
      name: "Nikolai Ferns",
      role: "Backend Developer",
      linkedin: "",
      github: "",
      email: "ferns.niko@gmail.com",
      imageUrl:
        "",
    },
    // {
    //   name: "Sakshi Bhalla",
    //   role: "Design lead, Frontend Developer",
    //   linkedin: "https://www.linkedin.com/in/sakshibhalla0/s",
    //   github: "https://github.com/SakshiBhalla77",
    //   email: "sakshibhalla27@gmail.com",
    //   imageUrl:
    //     "https://media.licdn.com/dms/image/D5603AQFD4PL2oYUeMQ/profile-displayphoto-shrink_800_800/0/1703091450612?e=1723075200&v=beta&t=ZpuQfUz_ZUJMxJnLhWLeaydv-kiJS3X2kPE25YwuINo",
    // },
    {
      name: "Aryan Khatri",
      role: "Frontend Developer",
      linkedin: "https://www.linkedin.com/in/aryan-khatri2023/",
      github: "https://github.com/ARYAN-khatri83",
      email: "aryan3kkhatri@gmail.com",
      imageUrl:
        "https://media.licdn.com/dms/image/v2/C5603AQFa_GWIC-cMYg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1661828217376?e=1732752000&v=beta&t=H9A1wy4mWfJDIZzKtUIfiE58CX7gfraUbONobkQBLcc",
    },
    {
      name: "Shashank Dubey",
      role: "Technical Lead, Fullstack Developer",
      linkedin: "https://www.linkedin.com/in/shashank-dubey-b3684a21b/",
      github: "https://github.com/CorruptEntity0982",
      email: "shashank02.dubey@gmail.com",
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D5603AQHXM7Pr7U58RQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721998193011?e=1732752000&v=beta&t=SW9z2xGWKdZxXXm7tPpKgzmYadxsCMGnhRbd0dPfSog",
    },
  ];

  return (
    <div className="container">
      <h2>Contact Us</h2>
      <div className="teamContainer">
        {teamMembers.map((member, index) => (
          <div key={index} className="memberContainer">
            <div className="box">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="profileImage"
              />
              <div className="content">
                <div className="nameRole">
                  <p className="name">{member.name}</p>
                  <p>{member.role}</p>
                </div>

                <div className="contact">
                  <h3>Contact Me At</h3>
                  <div className="iconsContainer">
                    <a
                      href={member.linkedin}
                      className="iconLink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        size="2x"
                        style={{ color: "#0A66C2" }}
                      />
                    </a>
                    <a
                      href={member.github}
                      className="iconLink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faGithub}
                        size="2x"
                        style={{ color: "black" }}
                      />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="iconLink"
                    >
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        size="2x"
                        style={{ color: "#3E65CF" }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;

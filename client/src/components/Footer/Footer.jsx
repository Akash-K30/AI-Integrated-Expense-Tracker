import "./Footer.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer(){

    return(

        <footer className="footer">

            <div>

                <h3>

                    AI Expense Tracker

                </h3>

                <p>

                    © {new Date().getFullYear()} Akash

                </p>

            </div>

            <div className="footer-links">

                <a

                    href="https://github.com/Akash-K30"

                    target="_blank"

                    rel="noreferrer"

                >

                    <FaGithub/>

                </a>

                <a

                    href="https://linkedin.com/in/akash-kaliraman00"

                    target="_blank"

                    rel="noreferrer"

                >

                    <FaLinkedin/>

                </a>

            </div>

        </footer>

    );

}
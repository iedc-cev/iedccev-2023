import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import Rounded from "../../common/RoundedButton";
export default function Index() {
    const phrase =
        "IEDC aims to promote entrepreneurship among students by conducting various activities such as entrepreneurship awareness camps, entrepreneurship development programs, faculty development programs, and networking events.";
    const description = useRef(null);
    const isInView = useInView(description);
    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                    {phrase.split(" ").map((word, index) => {
                        return (
                            <span key={index} className={styles.mask}>
                                <motion.span
                                    variants={slideUp}
                                    custom={index}
                                    animate={isInView ? "open" : "closed"}
                                    key={index}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        );
                    })}
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
                    It serves as a hub for nurturing innovative business ideas, providing
                    mentorship, and facilitating the conversion of entrepreneurial
                    concepts into commercially viable business plans.
                </motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Rounded className={styles.button}>
                        <p>Join Us</p>
                    </Rounded>
                </div>
            </div>
        </div>
    );
}

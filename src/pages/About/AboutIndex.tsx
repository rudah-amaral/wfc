import styles from "./About.module.scss";

export default function AboutIndex() {
  return (
    <>
      <p>Hello and welcome to my website!</p>
      <p>
        You can access the repository with its source code{" "}
        <a href="https://github.com/rudah-amaral/wfc" className={styles.link}>
          here
        </a>
        .
      </p>
      <p>
        This is my first somewhat large scoped front-end project, involving a
        image-generation algorithm well-suited with the tech stack I&apos;m
        learning in order to get a job in the software development world.
      </p>
      <p>
        In other words it was my self-applied test to verify I was able to
        handle these technologies, to gain some confidence in my skills. If I
        could build something fairly complex by myself, then maybe a job in the
        industry wouldn&apos;t seem so out of reach anymore. Who knows?
      </p>
      <p>
        Even so, this project was not fruit from the efforts of a single person.
        I have a lot of folk to be grateful for to be honest.
      </p>
      <p>
        If any of this is of your interest, click in the corresponding link to
        access more informations on said topic.
      </p>
    </>
  );
}

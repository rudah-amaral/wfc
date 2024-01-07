import styles from "./About.module.scss";

export default function AboutAcknowledgments() {
  return (
    <>
      <p>
        The algorithm itself was first conceived by{" "}
        <a href="https://twitter.com/ExUtumno" className={styles.link}>
          Maxin Gumin
        </a>
        . His{" "}
        <a
          href="https://github.com/mxgmn/WaveFunctionCollapse"
          className={styles.link}
        >
          GitHub repo
        </a>{" "}
        is the main source on the subject, containing not only implementation,
        explanations and examples, but also tons and tons of &quot;Notable
        ports, forks and spin-offs.&quot; I couldn&apos;t recommend more for you
        to take some time to just even skim through it.
      </p>

      <h4>Tileset Designers:</h4>
      <p>
        All tilesets used in this website were made by kind people who granted
        me permission to use them. Without them I&apos;d have to make all used
        tilesets by myself and they wouldn&apos;t be half as good. Thanks
        y&apos;all!
      </p>
      <ul>
        <li>
          <a href="https://twitter.com/exutumno" className={styles.link}>
            Maxim Gumin
          </a>
          : Made the Castle, Circuit, Rooms and Knots tilesets.
        </li>
        <li>
          <a href="https://twitter.com/quasimondo" className={styles.link}>
            Mario Klingemann
          </a>
          : Made the Circles tileset.
        </li>
      </ul>

      <h4>Family and Friends</h4>
      <p>
        Last but not the least, I would like to show my appreciation for those
        who kept on supporting me through this period of learning and
        development. I know for sure I have my limitations, but then again, who
        doesn&apos;t? Not everything we plan for ourselves will go through and
        when life pushes you down it can be really hard to get back up on your
        feet. But it has been easier with you. For those who listened and stayed
        by my side: thank you. I love you with all of my heart.
      </p>
    </>
  );
}

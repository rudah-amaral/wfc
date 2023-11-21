import styles from "./About.module.scss";

export default function AboutAcknowledgments() {
  return (
    <>
      <p>
        This project was heavily inspired by a coding challenge proposed by{" "}
        <a
          href="https://www.youtube.com/@TheCodingTrain"
          className={styles.link}
        >
          The Coding Train
        </a>
        , in which{" "}
        <a href="https://twitter.com/shiffman" className={styles.link}>
          Daniel Shiffman
        </a>{" "}
        demonstrates the Wave Function Collapse algorithm and where I first had
        contact with it. Like his other projects, it was implemented with a
        Processing-based framework called P5.js.
      </p>
      <div className={styles.embedContainer}>
        <iframe
          src="https://www.youtube.com/embed/rI_y2GAlQFM"
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        The algorithm itself was first conceived by{" "}
        <a href="https://twitter.com/ExUtumno" className={styles.link}>
          Maxin Gumin
        </a>
        , who very kindly granted me permission to use his tileset Circuit in
        this demonstration. His{" "}
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
      <p>
        Following is a series of projects and videos from very talented folk,
        whose work inspired and helped me along my journey into the depths of
        WFC:
      </p>

      <h4>
        <a href="https://twitter.com/OskSta" className={styles.link}>
          Oskar Stålberg
        </a>
      </h4>
      <p>
        It&apos;s hard to dive into the subject of WFC without stumbling into
        Townscaper, a game developed by Oskar. In it you are presented to a
        irregular grid juxtaposed above an infinite sea. Clicking on any empty
        cell on this grid will instantly materialize a building in that spot.
        This building is an instance of one of many modules, all of which have
        pre-established relations with each other.
      </p>
      <p>
        As you keep clicking on empty cells, the game will calculate the
        constrains of the modules on the surrounding cells in order the select
        which new building should appear at the selected spot. Regardless of
        which cells you click (and the urban mess you create), the resulting
        town will always look congruent, with it&apos;s parts joined
        harmoniously.
      </p>
      <div className={styles.embedContainer}>
        <iframe
          src="https://www.youtube.com/embed/hqq25n6cQqo"
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        He also developed this{" "}
        <a
          href="https://oskarstalberg.com/game/wave/wave.html"
          className={styles.link}
        >
          very fun website
        </a>{" "}
        which also demonstrates WFC&apos; simple tiled model, give it a try! In
        the technical side of things, his version is built in Unity, leveraging
        the power of WebAssembly to port it to the web platform, a very
        ingenious possibility I wasn&apos;t aware of before, while mine was
        built with React and other web technologies.
      </p>
      <p>
        At the time of writing my implementation is missing some of the features
        from his, like the possibility to select a sub-set of modules from the
        tileset from which to generate the final image, manual collapsing a cell
        to a specific tile instead of relying on the &apos;least entropyt&apos;
        heuristic, as well as a slider defining the delay between steps.
        I&apos;m not sure how, but it was this last feature that enlightened me
        on how to convert my recursive entropy propagation function into a
        iterative one, so props for that!
      </p>

      <h4>
        <a href="https://twitter.com/boris_brave" className={styles.link}>
          Boris The Brave
        </a>
      </h4>
      <p>
        In his website, Boris wrote a small article named, wait for it,{" "}
        <a
          href="https://www.boristhebrave.com/2020/04/13/wave-function-collapse-explained/"
          className={styles.link}
        >
          Wave Function Collapse Explained
        </a>
        . In it he goes through some basics of constraint programming to then
        zoom in in the concept of WFC, first the simple tiled and then the
        overlapping model, covering the basics, going through nomenclature and
        the algorithm itself in a clear and succinct way and using images to
        illustrate his examples.
      </p>
      <p>
        If you played around with WFC in this demo or Oskar&apos;s and want to
        start learning the subject I would highly recommend reading it.
      </p>

      <h4>
        <a href="https://twitter.com/bolddunkley" className={styles.link}>
          Martin Donald
        </a>
      </h4>
      <p>
        It&apos;s easy to draw a parallel between Sudoku, the quintessential
        example of a constraint solving game, and WFC&apos; simple tiled model,
        or at least Martin makes it seem, succeeding in explaining one through
        the other.
      </p>
      <p>
        Even though he displays WFC in 3D to exemplify how adjacency constraints
        are what varies the most between implementations, what struck me the
        most is how similar, and sometimes exactly the same, it is to expand the
        algorithm from 2D to 3D. It really highlighted to me how flexible WFC
        can be.
      </p>
      <div className={styles.embedContainer}>
        <iframe
          src="https://www.youtube.com/embed/2SuvO4Gi7uY"
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>

      <h4>
        <a href="https://twitter.com/_DV_Gen_" className={styles.link}>
          DV Gen
        </a>
      </h4>
      <p>
        There are a myriad of procedural generation algorithms out there, and DV
        Gen introduces some of them, highlighting common problems found when
        using procedural voxel terrain and how he avoided several of its
        drawbacks using WFC in his side-project instead.
      </p>
      <p>
        What I personally like the most is how he considers the trade-offs of
        each strategy in order to mitigate them.
      </p>
      <div className={styles.embedContainer}>
        <iframe
          src="https://www.youtube.com/embed/20KHNA9jTsE"
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        In his second video, he compares WFC with it&apos;s logical predecessor,
        Model Synthesis, the procedural generation algorithm that originally
        inspired Maxin when he developed his own.
      </p>
      <div className={styles.embedContainer}>
        <iframe
          src="https://www.youtube.com/embed/zIRTOgfsjl0"
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>

      <h4>
        <a href="https://twitter.com/WattDesigns" className={styles.link}>
          Watt Designs
        </a>
      </h4>
      <p>
        This is a cool case study for the use of WFC in game development. It
        shows the benefits of relying on it when generating worlds instead of
        placing modules based on pure noise and the challenges of optimizing the
        algorithm in order to it be actually usable in this context.
      </p>
      <div className={styles.embedContainer}>
        <iframe
          src="https://www.youtube.com/embed/dFYMOzoSDNE"
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>

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

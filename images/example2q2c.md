```latex
\usepackage{tikz}
\usetikzlibrary{automata, arrows.meta, positioning}
\begin{document}
\definecolor{nodeFillColor}{HTML}{f0f0f0}
\begin{tikzpicture}[
      shorten >=3pt,
      bend angle=30,
      inner sep=4pt,
      thick,
      node distance=120pt,
      >={Stealth[round]},
      initial text=start,
every state/.style={fill=nodeFillColor,},
accepting by double/.style={double, double distance=1.5pt},
on grid]
	\node[state, initial left] (q1) {$q_{1}$};
	\node[state] (q2) [right of=q1] {$q_{2}$};
	\node[state] (q3) [right of=q2] {$q_{3}$};
	\node[state] (q4) [right of=q3] {$q_{4}$};
	\node[state, accepting] (q5) [right of=q4] {$q_{5}$};
    \draw (q1) edge [above, ->] node[auto]{$\varepsilon,\varepsilon\to\$$} (q2);
    \draw (q2) edge [above, ->] node[auto]{$b,\varepsilon\to*$} (q3);
    \draw (q3) edge [above, ->] node[auto]{$a,*\to\varepsilon$} (q4);
    \draw (q4) edge [above, ->] node[above]{$\varepsilon,\$\to\varepsilon;$} (q5);
	\draw (q4) edge [above, ->] node[below]{$\varepsilon,*\to\varepsilon;$} (q5);
\end{tikzpicture}
\end{document}
```

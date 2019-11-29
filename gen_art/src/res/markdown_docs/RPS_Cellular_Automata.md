# RPS Cellular Automata
#### November 29th, 2019

Cellular Automata has been something I've been interested in since I learned about Conway's Game of Life years ago.

RPS (Rock, Paper, Scissors) Cellular Automata is one of a small list of CA ideas I'm looking into. This one was written in an hour back during HackTX in October, 2019.

The novelty of this type of cellular automata is that it is extensible in the sense that I can define a n length chain of discrete states beyond simply Rock, Paper, and Scissors.

For example, what if I had a state system represented in the following encoding:

| State | Color  | Strong Against |
|:-----:|--------|----------------|
| 0     | Black  | 1, 2           |
| 1     | White  | 2, 3           |
| 2     | Red    | 3, 4           |
| 3     | Blue   | 4, 5           |
| 4     | Green  | 5, 0           |
| 5     | Yellow | 0, 1           |

Say we have two adjacent cells matched against each other. One is of State 0, the other is of State 5.

Referring to the table, State 5 is strong against State 0 and one cell loses to the other, much like how Rock loses to Paper. An event occurs.

Say the states are now 0 and 3. Neither are strong against another, so they end up in a tie. No event occurs.

The CA can run off of such rules (which can be procedurally generated) to generate all sorts of end results. It would be interesting to see how entropy increases as the number of states increase.

---
This program is by default, a 3 state system (RPS). Pretty simple, but a couple of additional features are added to keep it interesting.

1.  **Image seeding** - I used a base of image and at each pixel, I determined the dominant color channel and used that as the starting cell state. This is also partly why I used a 3 state system.
2.  **Probability** - The model is also probabilistic in a way: instead of deterministic winners/losers, if there is a winner/loser pair, I roll a die to see if the winner consumes the loser and transforms its state. I did a similar thing for EE422C (Software Design and Implementation II) for a program called Critters, which is a rule based world of critters roaming, eating, and reproducing. Additionally, which cell is confronted by the current cell is also chose at random.
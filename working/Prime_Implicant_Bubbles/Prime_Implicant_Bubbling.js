/**
 *  Prime_Implicant_Bubbling.js
 * Matthew Yu
 * 10/27/19
 * One of a series of sketches involving Generative Art.
 *
 * Algorithm: minimum sum-of-products expression from a Karnaugh map
 * Step 1: choose an element of the ON-set
 * Step 2: find "maximal" groupings of 1s and Xs adjacent to that element
 *      consider top/bottom row, left/right column, and corner adjacencies
 *      this forms prime implicants (number of elements always a power of 2)
 * Repeat Steps 1 and 2 to find all prime implicants
 * Step 3: revisit the 1s in the K-map
 *      if covered by single prime implicant, it is essential, and participates in final cover
 *      1s covered by essential prime implicant do not need to be revisited
 * Step 4: if there remain 1s not covered by essential prime implicants
 *      select the smallest number of prime implicants that cover the remaining 1s
 */

'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let averageAge = 0;
  let filterCentury = 0;

  (century > 0)
    ? filterCentury = people
      .filter(man => man.sex === 'm')
      .filter(person => Math.ceil(person.died / 100) === century)
    : filterCentury = people
      .filter(man => man.sex === 'm');

  averageAge = filterCentury
    .reduce((prev, curr) =>
      prev + (curr.died - curr.born), 0);

  return averageAge / filterCentury.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let averageWomenAge = 0;
  let womenMap;

  (!withChildren)
    ? womenMap = people
      .filter(women => women.sex === 'f')

    : womenMap = people
      .filter(women => women.sex === 'f' && people.some(child => {
        return women.name === child.mother;
      }));

  averageWomenAge = womenMap
    .reduce((prev, curr) => prev + (curr.died - curr.born), 0);

  return averageWomenAge / womenMap.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ages = people.filter(person =>
    onlyWithSon
      ? people.some(mother =>
        mother.name === person.mother && person.sex === 'm')
      : people.some(mother => mother.name === person.mother)
  ).map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  const averageWomenAge = ages.reduce((mother, child) => mother + child, 0);

  return averageWomenAge / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

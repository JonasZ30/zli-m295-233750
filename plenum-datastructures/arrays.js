const grades = [
    {name: "Thomann", grade: 5.0},
    {name: "Bürgis", grade: 5.0},
    {name: "Norris", grade: 7.0},
    {name: "Lopez", grade: 6.5},
    {name: "Smith", grade: 4.8},
    {name: "Patel", grade: 6.2},
    {name: "Kim", grade: 5.7},
    {name: "Garcia", grade: 6.0},
    {name: "Zhang", grade: 7.1},
    {name: "Kumar", grade: 5.5}
  ]

console.log(grades.filter((grade) => grade.grade >= 6))

const names = grades.map((grade) => grade.name)
console.log(names)

grades.forEach(grade => {
    const roundedGrade = Math.round(grade.grade + 0.1)
    console.log(`Name: ${grade.name}, Grade: ${roundedGrade}`)
});

console.log("")
console.log(grades.reduce((gradeBefore, grade) =>gradeBefore + grade.grade, 0));
console.log("")
console.log(grades.find((grade) => grade.grade === 5.0))

//grades.forEach(grade => {
//    if (grade.grade >= 6) {
//        console.log(grade);
//    }
//});
const gradeGpa = {
  "A+": 4.0,
  A: 3.75,
  "A-": 3.5,
  "B+": 3.25,
  B: 3.0,
  "B-": 2.75,
  "C+": 2.5,
  C: 2.25,
  D: 2.0,
  F: 0.0,
};
export function gradeToSgpa(grade) {
  return gradeGpa[grade];
}

export function calculateYgpa(subjects) {
  let totalSgpa = 0;
  let totalCredit = 0;

  subjects.forEach((subject) => {
    (totalCredit += Number(subject.credit)),
      (totalSgpa += gradeGpa[subject.grade] * Number(subject.credit));
  });
  return totalSgpa / totalCredit;
}

export function getCredit(subjects) {
  let totalCredit = 0;
  subjects.forEach((sub) => {
    if (sub.grade !== "F") {
      totalCredit += Number(sub.credit);
    }
  });
  return totalCredit;
}

export function isPass(subjects) {
  let isPass = true;
  let totalCredit = 0;

  subjects.forEach((sub) => {
    if (sub.type === "Lab" && sub.grade === "F") {
      isPass = false;
    }
    totalCredit += Number(sub.credit);
  });
  if (totalCredit - getCredit(subjects) > 6) {
    isPass = false;
  }
  return isPass;
}

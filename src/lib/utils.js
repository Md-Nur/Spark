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

export function calculateSgpa(subjects) {
  let totalSgpa = 0;
  let totalCredit = 0;

  subjects.forEach((subject) => {
    totalCredit += Number(subject.credit);
    totalSgpa += gradeGpa[subject.grade] * Number(subject.credit);
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

export function isPass(subjects, session) {
  let isPass = true;
  let totalCredit = 0;

  subjects.forEach((sub) => {
    if (sub.type === "Lab" && sub.grade === "F") {
      isPass = false;
    }
    totalCredit += Number(sub.credit);
  });
  if (totalCredit - getCredit(subjects) > 8 && session === "22-23") {
    isPass = false;
  } else if (totalCredit - getCredit(subjects) > 9 && session !== "22-23") {
    isPass = false;
  }
  return isPass;
}

export function getCgpa(results) {
  let totalYgpa = 0;
  let totalCredit = 0;

  results.forEach((result) => {
    totalYgpa += result.ygpa * getCredit(result.subjects);
    totalCredit += getCredit(result.subjects);
  });
  return totalYgpa / totalCredit;
}

export const hall = {
  0: "Not Assigned",
  101: "Sher-E-Bangla Fazlul Haque Hall",
  102: "Shah Mukhdum Hall",
  103: "Nawab Abdul Latif Hall",
  104: "Syed Amir Ali Hall",
  105: "Shahid Shamsuzzoha Hall",
  106: "Shahid Habibur Rahman Hall",
  107: "Matihar Hall",
  108: "Madar Bux Hall",
  109: "Huseyn Shaheed Suhrawardy Hall",
  110: "Shahid Ziaur Rahman Hall",
  111: "Bangabandhu Sheikh Mujibur Rahman Hall",
  120: "Mannujan Hall",
  121: "Rokeya Hall",
  122: "Tapashi Rabeya Hall",
  123: "Begum Khaleda Zia Hall",
  124: "Rahamatunnesa Hall",
  125: "Bangamata Sheikh Fazilatunnesa Hall",
  130: "Shahid Mir Abdul Quayyum International Dormitory",
};

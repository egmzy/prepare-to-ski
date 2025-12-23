// Hebrew workout data for 40-day ski prep routine
export const workoutDataHe = {
    getReady: {
        name: "הכנה",
        duration: 10,
        phase: "prep",
        note: "תמצאו מקום נוח - תכף מתחילים!"
    },

    warmUp: [
        {
            name: "הנפות רגליים (קדימה/אחורה)",
            duration: 30,
            phase: "warm-up",
            note: "30 שניות לכל רגל - קדימה ואחורה"
        },
        {
            name: "הנפות רגליים (לצדדים)",
            duration: 30,
            phase: "warm-up",
            note: "30 שניות לכל רגל - מצד לצד"
        },
        {
            name: "פתיחת מפרק ירך",
            duration: 60,
            phase: "warm-up",
            note: "פותחים את מפרקי הירך לניידות טובה יותר"
        },
        {
            name: "פיתולי גו",
            duration: 60,
            phase: "warm-up",
            note: "סובבו את פלג הגוף העליון, שמרו על יציבות האגן"
        }
    ],

    rest1: {
        name: "מנוחה ונשימה",
        duration: 20,
        phase: "rest",
        note: "יאלללה הכנה לסבב העיקרי!"
    },

    circuit: [
        {
            name: "סקוואט",
            duration: 60,
            phase: "circuit",
            focus: "Endurance",
            note: "משקל על העקבים; גב ישר"
        },
        {
            name: "ישיבה מול קיר",
            duration: 60,
            phase: "circuit",
            focus: "Endurance",
            note: "ברכיים ב-90 מעלות; גב צמוד לקיר"
        },
        {
            name: "מכרעים קדימה",
            duration: 60,
            phase: "circuit",
            focus: "Strength",
            note: "רגליים לסירוגין; לשמור על שיווי משקל"
        },
        {
            name: "סקוואט קוזאק",
            duration: 60,
            phase: "circuit",
            focus: "Lateral",
            note: "פיסוק רחב; ירידה עמוקה הצידה בכל פעם"
        },
        {
            name: "סקוואט קפיצה",
            duration: 60,
            phase: "circuit",
            focus: "Power",
            note: "נחיתה רכה לספיגת ה\"מוגולים\""
        },
        {
            name: "ישיבה מול קיר (סבב 2)",
            duration: 60,
            phase: "circuit",
            focus: "Endurance",
            note: "ידיים לצדי הגוף (לא על הברכיים)!"
        },
        {
            name: "פלאנק",
            duration: 60,
            phase: "circuit",
            focus: "Core",
            note: "גוף בקו ישר; לכווץ ישבן"
        },
        {
            name: "פלאנק צידי",
            duration: 60,
            phase: "circuit",
            focus: "Core",
            note: "30 שניות לכל צד; אגן גבוה"
        },
        {
            name: "טיפוס הרים",
            duration: 60,
            phase: "circuit",
            focus: "Agility",
            note: "קצב מהיר; ידיים מתחת לכתפיים"
        },
        {
            name: "פיתולים רוסיים",
            duration: 60,
            phase: "circuit",
            focus: "Rotation",
            note: "רגליים באוויר; נגיעה ברצפה בכל צד"
        },
        {
            name: "בירד-דוג",
            duration: 60,
            phase: "circuit",
            focus: "Stability",
            note: "הרמת יד ורגל נגדית; ללא נדנוד אגן"
        },
        {
            name: "מכרע צידי",
            duration: 60,
            phase: "circuit",
            focus: "Lateral",
            note: "מדמה העברת משקל בין המגלשיים"
        }
    ],

    rest2: {
        name: "מנוחה ונשימה",
        duration: 30,
        phase: "rest",
        note: "עבודה מצוינת! שיווי משקל והתאוששות בהמשך!"
    },

    recovery: [
        {
            name: "עמידה על רגל אחת (שמאל)",
            duration: 60,
            phase: "recovery",
            note: "עצמו עיניים לסימולציה של ערפל/תאורה שטוחה במסלול"
        },
        {
            name: "עמידה על רגל אחת (ימין)",
            duration: 60,
            phase: "recovery",
            note: "עצמו עיניים לסימולציה של ערפל/תאורה שטוחה במסלול"
        },
        {
            name: "מתיחת ישבן",
            duration: 60,
            phase: "recovery",
            note: "30 שניות לכל צד - נשמו עמוק"
        }
    ],

    complete: {
        name: "האימון הסתיים! 🎿",
        duration: 0,
        phase: "complete",
        note: "כל הכבוד! אתם יום אחד קרוב יותר למדרונות!"
    }
};

// Build the full workout sequence in Hebrew
export function getWorkoutSequenceHe() {
    return [
        workoutDataHe.getReady,
        ...workoutDataHe.warmUp,
        workoutDataHe.rest1,
        ...workoutDataHe.circuit,
        workoutDataHe.rest2,
        ...workoutDataHe.recovery,
        workoutDataHe.complete
    ];
}

// Calculate total workout time
export function getTotalWorkoutTimeHe() {
    const sequence = getWorkoutSequenceHe();
    return sequence.reduce((total, exercise) => total + exercise.duration, 0);
}

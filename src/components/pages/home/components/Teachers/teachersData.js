// أسماء التراكات الأربعة عندك بالكود
export const TRACK_LABELS = {
  scientific: "علمي",
  literary: "أدبي",
  sharia: "شرعي",
  entrepreneurship: "ريادة أعمال",
};

// معرّفات الفروع الحقيقية كما هي مخزنة بقاعدة البيانات (GET /api/v1/branches)
// ⚠️ لو حدا حذف هاي الفروع وعمل seed جديد بمعرّفات مختلفة، لازم تحدّث هاي القيم
export const BRANCH_IDS = {
  scientific: "cmtm0gldp0000jj1ycwx0k0uo", // الفرع العلمي
  literary: "cmtm0rgr20008jj1ydt06dhlq", // الفرع الأدبي
  sharia: "cmtm0rzu2000hjj1ynf04dnbp", // الفرع الشرعي
  entrepreneurship: "cmtm0ups00010jj1ywcrhcz5t", // الفرع الريادي
};
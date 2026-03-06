export function migrateCompanyMemo(projectId: string, companyName: string) {
  try {
    const perKey = `project_${projectId}_${companyName}_memo`;
    const stored = localStorage.getItem(perKey);
    const companyMemosKey = `${projectId}_company_memos`;
    const storedCompanyMemos = localStorage.getItem(companyMemosKey);

    if (!stored && storedCompanyMemos) {
      try {
        const obj = JSON.parse(storedCompanyMemos || "{}");
        const cm = obj[companyName];
        if (cm) {
          localStorage.setItem(perKey, cm);
          return cm;
        }
      } catch (e) {
        return null;
      }
    }

    return stored;
  } catch (e) {
    return null;
  }
}

export default migrateCompanyMemo;

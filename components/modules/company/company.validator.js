class CompanyValidator {
  static validate(company) {
    if (!company?.full_name?.length) return null;
    if (!company?.short_name?.length) return null;
    if (!company?.classification?.length) return null;
    if (!company?.ownership?.length) return null;
    if (!company?.registry_code?.length) return null;

    return true;
  }
}

export default CompanyValidator;

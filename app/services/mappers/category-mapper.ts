export interface CategoryDomainDTO {
  id: string
  name?: string
}

class CategoryMapper {
  toPersistance(domainCategory: CategoryDomainDTO): CategoryDomainDTO {
    return {
      id: domainCategory.id,
      name: domainCategory.name,
    }
  }

  toDomain(persistanceCategory: CategoryDomainDTO): CategoryDomainDTO {
    return {
      id: persistanceCategory.id,
      name: persistanceCategory.name,
    }
  }
}

export const categoryMapper = new CategoryMapper()

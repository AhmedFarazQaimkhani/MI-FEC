import { Category } from '../common/interfaces';
// Gets category name by cat id
export const getCategoryName = (categories: Category[], catIds: number[], withObject: boolean) => {
  if (categories.length < 1) return [];

  let categoryWithName: any = [];
  for (const catId of catIds) {
    const cat = categories.filter((category: Category) => {
      return category.id === catId;
    });
    if (withObject) {
      categoryWithName.push(cat[0]);
    } else {
      categoryWithName.push(cat[0]?.name as any);
    }
  }
  return categoryWithName;
};

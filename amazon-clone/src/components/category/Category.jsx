import React from 'react'
import { categoryInfos } from './categoryFullInfos'
import CategoryCard from './CategoryCard'
import classes from './Category.module.css'

function Category() {
  return (
    <section className={classes.categoryList}>
      {
        categoryInfos.map((infos, index) => {
          return <CategoryCard key={index} data = {infos} />
        })
      }
    </section>
  )
}

export default Category
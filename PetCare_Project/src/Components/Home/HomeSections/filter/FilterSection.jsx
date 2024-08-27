import React, { useState } from 'react';
import "../filter/filterSection.scss"
import { Collapse } from 'antd';
import FilterForm from './FilterForm';

const FilterSection = ({filterOptions,setFilterOptions}) => {

  return (
    <div className='filter-form-container'>
    <Collapse
      size="small"
      items={[
        {
          key: '1',
          label: 'Filter',
          className:"Filter-label",
          children:(
            <FilterForm filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>
          ),
        },
      ]}
    />
    </div>
  )
}

export default FilterSection;

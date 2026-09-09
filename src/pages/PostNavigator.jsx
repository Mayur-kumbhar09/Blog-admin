import React from 'react';
import { Breadcrumb } from 'antd';

const PostNavigator = () => {
  return (
    <div style={{margin:'20px'}}>
        <Breadcrumb
      items={[
        {
          title: 'All',
        },
        {
          title: 'Mine',
        },
        {
          title: 'Published',
        },
        {
          title: 'Drafts',
        },
        {
          title: 'Trash',
        },
      ]}
    />
    </div>
  )
}

export default PostNavigator

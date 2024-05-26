import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants';
import { auth } from '@clerk/nextjs';
import TransformationForm from '@/components/shared/TransformationForm';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } } : SearchParamProps ) => {
  const {userId} = auth();

  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in');
    
  const user = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformation?.title || 'Transformation Title'}
        subtitle={transformation?.subTitle || 'Transformation Subtitle'}
      />

      <TransformationForm 
        action="Add"
        userId={user._id}
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}      
      />
    </>
  )
}

export default AddTransformationTypePage
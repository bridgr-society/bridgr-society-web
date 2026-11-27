'use client';
/* Progressive enhancement: submit a GET filter form as soon as a select changes.
   Without JavaScript the visible "Apply" button does the same. */
export function AutoSubmitSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>){
  return <select {...props} onChange={e => e.currentTarget.form?.requestSubmit()} />;
}

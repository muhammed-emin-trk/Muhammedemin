export default function BlogDetail({params}:{params:{slug:string}}){return <main className='mx-auto max-w-3xl p-6 text-slate-100'><h1 className='text-3xl font-bold'>{params.slug}</h1></main>}

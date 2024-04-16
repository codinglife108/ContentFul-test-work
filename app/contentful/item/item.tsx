"use client"

export default function PageItemComponent({item}: any) {
  return (
    <div>
        <p className="title">{item.title}</p>
        <p className="file">{item.fileName}</p>
        <hr />
    </div>
  );
}

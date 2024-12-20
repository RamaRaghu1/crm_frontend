import React from 'react';




export function KanbanColumn({ title, cards, color }) {
  return (
    <div className="flex flex-col w-80 shrink-0 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
      {/* <ColumnHeader title={title} color={color} cardCount={cards.length} /> */}
      
      <div className="p-2 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2 min-h-[calc(100vh-12rem)]">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* <ColumnFooter /> */}
    </div>
  );
}
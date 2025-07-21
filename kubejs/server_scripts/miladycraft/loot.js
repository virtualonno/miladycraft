LootJS.lootTables(e => {
    let removeLoot = globalItemRemovals.map(item => {
      if (typeof item === 'object') return item.item;
      return item;
    });
    removeLoot.push(
        'umapyoi:skill_book'
    );
  
    e.forEachTable(table => {
      table.removeItem(removeLoot);
    });
  
  });
       
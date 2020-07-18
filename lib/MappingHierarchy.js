const adjustmentData = (data) => {
  return data.map(i => {
    if (i.id_parent_position == 0) delete i.id_parent_position
  })
}

const MappingHierarchy = (data, root) => {
  let newData = adjustmentData(data)

  let res = {}
  data.forEach(i => {
    if (i.id_parent_position !== 0) {
      Object.assign(res[i.id_position] = res[i.id_position] || {}, {name: i.position})
      res[i.id_parent_position] = res[i.id_parent_position] || {}
      res[i.id_parent_position].children = res[i.id_parent_position].children || []
      res[i.id_parent_position].children.push(res[i.id_position])
    }
  })
  return res[root].children
}

export default MappingHierarchy
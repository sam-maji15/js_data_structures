const Set = function(prop) {
  this.collection = []
  this.type = "SET"
  this.size = 0
  
  if (prop instanceof Array) this.collection = prop.slice()
  else if (typeof prop === 'Function' && prop.type === 'SET') this.collection = prop.values().slice()
  
  this.has = function(element) {
    if (this.collection.indexOf(element) !== -1)
      return true
    else return false
  }
  
  this.values = () => this.collection
  
  this.add = function(element) {
    if (this.has(element)) return
    else {
      this.collection.push(element)
      this.size++
    }
  }
  
  this.append = function(array) {
    array.forEach(element => {
      if(!this.has(element)) {
        this.collection.push(element)
        this.size++
      }
    })
  }
  
  this.remove = function(element) {
    if (typeof element !== 'Object' && typeof element !== 'Function' && this.has(element)) {
      this.collection.splice(this.collection.indexOf(element),1)
      this.size--
    }
    else if(element instanceof Array) this.reduce(element)
    else if(element instanceof Function && element.type === 'SET') this.reduce(element.values())
  }
  
  this.reduce = function(array) {
    if (!(array instanceof Array)) throw new TypeError("TypeError: Set.reduce only accepts an Array as parameter")
    else {
      array.forEach(element => {
        if(this.has(element)) {
          this.collection.splice(this.collection.indexOf(element), 1)
          this.size--
        }
      })
    }
  }
  
  this.union = function(secondSet) {
    var unionSet = new Set()
    unionSet.append(this.collection)
    secondSet.values().forEach(item => {
      unionSet.add(item)
    })
    return unionSet
  }
  
  this.intersection = function(secondSet) {
    let intersectionSet = new Set()
    secondSet.values().forEach(element => {
      if(this.has(element)) {
        intersectionSet.add(element)
      }
    })
    return intersectionSet
  }
  
  this.difference = function(secondSet) {
    let diffSet = new Set()
    this.values().forEach(element => {
      if(!secondSet.has(element)) {
        diffSet.add(element)
      }
    })
    return diffSet
  }
  
  this.isSubsetOf = function(set) {}
  this.isSupersetOf = function(set) {}
}

export default Set

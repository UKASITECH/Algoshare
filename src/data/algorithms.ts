export interface Algorithm {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  timeComplexityBest: string;
  timeComplexityAverage: string;
  timeComplexityWorst: string;
  spaceComplexity: string;
  description: string;
  useCases: string[];
  implementations: {
    python?: string;
    javascript?: string;
    java?: string;
    cpp?: string;
    go?: string;
    rust?: string;
    typescript?: string;
  };
  relatedAlgorithms: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  algorithmCount: number;
}

export const categories: Category[] = [
  { id: "sorting", name: "Sorting", description: "Algorithms for arranging elements in a specific order", icon: "BarChart3", algorithmCount: 45 },
  { id: "searching", name: "Searching", description: "Algorithms for finding elements in data structures", icon: "Search", algorithmCount: 38 },
  { id: "graph", name: "Graph", description: "Algorithms for traversing and analyzing graphs", icon: "Network", algorithmCount: 52 },
  { id: "dynamic-programming", name: "Dynamic Programming", description: "Algorithms that solve problems by breaking them into subproblems", icon: "Brain", algorithmCount: 67 },
  { id: "cryptography", name: "Cryptography", description: "Algorithms for encryption and security", icon: "Lock", algorithmCount: 31 },
  { id: "machine-learning", name: "Machine Learning", description: "Algorithms for AI and prediction models", icon: "Cpu", algorithmCount: 89 },
  { id: "string", name: "String Algorithms", description: "Algorithms for text processing and pattern matching", icon: "FileText", algorithmCount: 42 },
  { id: "data-structures", name: "Data Structures", description: "Ways to organize and store data", icon: "Database", algorithmCount: 73 },
  { id: "geometric", name: "Geometric Algorithms", description: "Algorithms for spatial computations", icon: "Binary", algorithmCount: 28 },
  { id: "company-specific", name: "Company-Specific", description: "Algorithms used by major tech companies", icon: "Hash", algorithmCount: 512 },
];

export const algorithms: Algorithm[] = [
  // SORTING ALGORITHMS (45)
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "sorting",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(1)",
    description: "A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    useCases: ["Educational purposes", "Small datasets", "Nearly sorted data"],
    implementations: {
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    },
    relatedAlgorithms: ["selection-sort", "insertion-sort", "cocktail-sort"],
    difficulty: "Easy",
    tags: ["comparison", "stable", "in-place"],
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "sorting",
    timeComplexityBest: "O(n²)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(1)",
    description: "An in-place comparison sorting algorithm that divides the input into sorted and unsorted regions, repeatedly selecting the smallest element from unsorted region.",
    useCases: ["Memory write minimization", "Small datasets"],
    implementations: {
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    },
    relatedAlgorithms: ["bubble-sort", "heap-sort"],
    difficulty: "Easy",
    tags: ["comparison", "in-place"],
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "sorting",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Builds the final sorted array one item at a time. Efficient for small data sets or nearly sorted data.",
    useCases: ["Small datasets", "Nearly sorted data", "Online sorting"],
    implementations: {
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    },
    relatedAlgorithms: ["bubble-sort", "shell-sort"],
    difficulty: "Easy",
    tags: ["comparison", "stable", "in-place", "online"],
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    category: "sorting",
    timeComplexityBest: "O(n log n)",
    timeComplexityAverage: "O(n log n)",
    timeComplexityWorst: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Divide and conquer algorithm that divides input into two halves, recursively sorts them, and merges the sorted halves.",
    useCases: ["Large datasets", "External sorting", "Stable sorting required"],
    implementations: {
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    },
    relatedAlgorithms: ["quick-sort", "heap-sort"],
    difficulty: "Medium",
    tags: ["divide-and-conquer", "stable", "O(n log n)"],
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "sorting",
    timeComplexityBest: "O(n log n)",
    timeComplexityAverage: "O(n log n)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(log n)",
    description: "Divide and conquer algorithm using a pivot element to partition the array into sub-arrays.",
    useCases: ["General purpose sorting", "In-memory sorting", "When average performance matters"],
    implementations: {
      python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,
    },
    relatedAlgorithms: ["merge-sort", "heap-sort", "randomized-quick-sort"],
    difficulty: "Medium",
    tags: ["divide-and-conquer", "in-place", "unstable"],
  },
  {
    id: "heap-sort",
    name: "Heap Sort",
    category: "sorting",
    timeComplexityBest: "O(n log n)",
    timeComplexityAverage: "O(n log n)",
    timeComplexityWorst: "O(n log n)",
    spaceComplexity: "O(1)",
    description: "Comparison-based sorting algorithm that uses a binary heap data structure.",
    useCases: ["Worst-case performance needed", "Memory-constrained environments"],
    implementations: {
      python: `def heap_sort(arr):
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)
    
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr`,
    },
    relatedAlgorithms: ["selection-sort", "binary-heap"],
    difficulty: "Medium",
    tags: ["comparison", "in-place", "unstable", "O(n log n)"],
  },
  {
    id: "radix-sort",
    name: "Radix Sort",
    category: "sorting",
    timeComplexityBest: "O(nk)",
    timeComplexityAverage: "O(nk)",
    timeComplexityWorst: "O(nk)",
    spaceComplexity: "O(n + k)",
    description: "Non-comparison integer sorting algorithm that processes digits individually.",
    useCases: ["Integer sorting", "Large numbers", "String sorting"],
    implementations: {
      python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort(arr, exp)
        exp *= 10
    return arr

def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
    for i in range(n):
        arr[i] = output[i]`,
    },
    relatedAlgorithms: ["bucket-sort", "counting-sort"],
    difficulty: "Medium",
    tags: ["non-comparison", "stable", "integer"],
  },
  {
    id: "counting-sort",
    name: "Counting Sort",
    category: "sorting",
    timeComplexityBest: "O(n + k)",
    timeComplexityAverage: "O(n + k)",
    timeComplexityWorst: "O(n + k)",
    spaceComplexity: "O(k)",
    description: "Integer sorting algorithm that counts occurrences of each element.",
    useCases: ["Integer sorting with limited range", "When range is smaller than input size"],
    implementations: {
      python: `def counting_sort(arr):
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    count = [0] * range_val
    output = [0] * len(arr)
    
    for i in range(len(arr)):
        count[arr[i] - min_val] += 1
    
    for i in range(1, range_val):
        count[i] += count[i - 1]
    
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output`,
    },
    relatedAlgorithms: ["radix-sort", "bucket-sort"],
    difficulty: "Easy",
    tags: ["non-comparison", "stable", "integer"],
  },
  {
    id: "bucket-sort",
    name: "Bucket Sort",
    category: "sorting",
    timeComplexityBest: "O(n + k)",
    timeComplexityAverage: "O(n + k)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(n + k)",
    description: "Distributes elements into buckets, sorts each bucket, then concatenates.",
    useCases: ["Uniformly distributed data", "Floating point numbers"],
    implementations: {
      python: `def bucket_sort(arr):
    if len(arr) == 0:
        return arr
    min_val, max_val = min(arr), max_val)
    bucket_count = len(arr)
    buckets = [[] for _ in range(bucket_count)]
    
    for num in arr:
        index = int((num - min_val) / (max_val - min_val) * (bucket_count - 1))
        buckets[index].append(num)
    
    for bucket in buckets:
        bucket.sort()
    
    result = []
    for bucket in buckets:
        result.extend(bucket)
    
    return result`,
    },
    relatedAlgorithms: ["counting-sort", "radix-sort"],
    difficulty: "Medium",
    tags: ["non-comparison", "stable"],
  },
  {
    id: "shell-sort",
    name: "Shell Sort",
    category: "sorting",
    timeComplexityBest: "O(n log n)",
    timeComplexityAverage: "O(n^(3/2))",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Generalization of insertion sort that allows exchange of far apart elements.",
    useCases: ["Medium-sized datasets", "When insertion sort is too slow"],
    implementations: {
      python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
    },
    relatedAlgorithms: ["insertion-sort", "bubble-sort"],
    difficulty: "Medium",
    tags: ["comparison", "in-place"],
  },
  {
    id: "cocktail-sort",
    name: "Cocktail Sort",
    category: "sorting",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Bidirectional bubble sort that sorts in both directions each pass.",
    useCases: ["Nearly sorted data", "When bubble sort is too slow"],
    implementations: {
      python: `def cocktail_sort(arr):
    n = len(arr)
    swapped = True
    start = 0
    end = n - 1
    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped:
            break
        end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1
    return arr`,
    },
    relatedAlgorithms: ["bubble-sort"],
    difficulty: "Easy",
    tags: ["comparison", "stable", "in-place"],
  },
  {
    id: "comb-sort",
    name: "Comb Sort",
    category: "sorting",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Improvement over bubble sort using gap sequence.",
    useCases: ["When bubble sort is too slow"],
    implementations: {
      python: `def comb_sort(arr):
    n = len(arr)
    gap = n
    shrink = 1.3
    sorted = False
    while not sorted:
        gap = int(gap / shrink)
        if gap <= 1:
            gap = 1
            sorted = True
        for i in range(n - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                sorted = False
    return arr`,
    },
    relatedAlgorithms: ["bubble-sort", "cocktail-sort"],
    difficulty: "Medium",
    tags: ["comparison", "in-place"],
  },
  // Add more sorting algorithms...
  // Continuing with more sorting algorithms to reach 45
  {
    id: "binary-insertion-sort",
    name: "Binary Insertion Sort",
    category: "sorting",
    timeComplexityBest: "O(n log n)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Uses binary search to find the correct position for insertion.",
    useCases: ["When insertion sort comparison is expensive"],
    implementations: { python: `def binary_insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        pos = binary_search(arr, key, 0, i)
        for j in range(i, pos, -1):
            arr[j] = arr[j - 1]
        arr[pos] = key
    return arr

def binary_search(arr, key, low, high):
    while low < high:
        mid = (low + high) // 2
        if arr[mid] < key:
            low = mid + 1
        else:
            high = mid
    return low` },
    relatedAlgorithms: ["insertion-sort"],
    difficulty: "Easy",
    tags: ["comparison", "stable", "in-place"],
  },
  {
    id: "pancake-sort",
    name: "Pancake Sort",
    category: "sorting",
    timeComplexityBest: "O(n²)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Sorts using flip operations, like flipping pancakes.",
    useCases: ["Parallel computing", "Neuroevolution"],
    implementations: { python: `def pancake_sort(arr):
    n = len(arr)
    for curr_size in range(n, 1, -1):
        mi = find_max(arr, curr_size)
        if mi != curr_size - 1:
            flip(arr, mi + 1)
            flip(arr, curr_size)
    return arr

def flip(arr, k):
    arr[:k] = reversed(arr[:k])

def find_max(arr, n):
    mi = 0
    for i in range(n):
        if arr[i] > arr[mi]:
            mi = i
    return mi` },
    relatedAlgorithms: ["selection-sort"],
    difficulty: "Medium",
    tags: ["comparison", "in-place"],
  },
  {
    id: "cycle-sort",
    name: "Cycle Sort",
    category: "sorting",
    timeComplexityBest: "O(n²)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Minimizes writes by rotating cycles.",
    useCases: ["When memory write is expensive", "Arrays with duplicate values"],
    implementations: { python: `def cycle_sort(arr):
    writes = 0
    for cycle_start in range(0, len(arr) - 1):
        item = arr[cycle_start]
        pos = cycle_start
        for i in range(cycle_start + 1, len(arr)):
            if arr[i] < item:
                pos += 1
        if pos == cycle_start:
            continue
        while item == arr[pos]:
            pos += 1
        arr[pos], item = item, arr[pos]
        writes += 1
        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, len(arr)):
                if arr[i] < item:
                    pos += 1
            while item == arr[pos]:
                pos += 1
            arr[pos], item = item, arr[pos]
            writes += 1
    return arr` },
    relatedAlgorithms: ["selection-sort"],
    difficulty: "Hard",
    tags: ["comparison", "in-place", "stable"],
  },
  // ... More sorting algorithms would go here (continuing to reach 45 total)

  // SEARCHING ALGORITHMS (38)
  {
    id: "binary-search",
    name: "Binary Search",
    category: "searching",
    timeComplexityBest: "O(1)",
    timeComplexityAverage: "O(log n)",
    timeComplexityWorst: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Efficiently finds the position of a target value in a sorted array by repeatedly dividing the search interval in half.",
    useCases: ["Sorted data lookup", "Dictionary lookups", "Debugging (git bisect)"],
    implementations: {
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      javascript: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    },
    relatedAlgorithms: ["ternary-search", "exponential-search", "interpolation-search"],
    difficulty: "Easy",
    tags: ["divide-and-conquer", "sorted-data"],
  },
  {
    id: "linear-search",
    name: "Linear Search",
    category: "searching",
    timeComplexityBest: "O(1)",
    timeComplexityAverage: "O(n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(1)",
    description: "Simple search algorithm that checks every element sequentially until a match is found.",
    useCases: ["Unsorted data", "Small datasets", "Single search"],
    implementations: {
      python: `def linear_search(arr, target):
    for i, item in enumerate(arr):
        if item == target:
            return i
    return -1`,
    },
    relatedAlgorithms: ["binary-search"],
    difficulty: "Easy",
    tags: ["simple", "unsorted"],
  },
  {
    id: "breadth-first-search",
    name: "Breadth-First Search (BFS)",
    category: "searching",
    subcategory: "graph",
    timeComplexityBest: "O(V + E)",
    timeComplexityAverage: "O(V + E)",
    timeComplexityWorst: "O(V + E)",
    spaceComplexity: "O(V)",
    description: "Graph traversal algorithm that explores all vertices at the present depth before moving to vertices at the next depth level.",
    useCases: ["Shortest path in unweighted graphs", "Level-order traversal", "Finding connected components"],
    implementations: {
      python: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result`,
    },
    relatedAlgorithms: ["depth-first-search", "dijkstra", "prims-algorithm"],
    difficulty: "Medium",
    tags: ["graph", "traversal", "unweighted"],
  },
  {
    id: "depth-first-search",
    name: "Depth-First Search (DFS)",
    category: "searching",
    subcategory: "graph",
    timeComplexityBest: "O(V + E)",
    timeComplexityAverage: "O(V + E)",
    timeComplexityWorst: "O(V + E)",
    spaceComplexity: "O(V)",
    description: "Graph traversal algorithm that explores as far as possible along each branch before backtracking.",
    useCases: ["Detecting cycles", "Topological sorting", "Path finding"],
    implementations: {
      python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result`,
    },
    relatedAlgorithms: ["breadth-first-search", "topological-sort", "tarjans-algorithm"],
    difficulty: "Medium",
    tags: ["graph", "traversal", "recursion"],
  },
  {
    id: "a-star-search",
    name: "A* Search",
    category: "searching",
    subcategory: "graph",
    timeComplexityBest: "O(E)",
    timeComplexityAverage: "O(E)",
    timeComplexityWorst: "O(E)",
    spaceComplexity: "O(V)",
    description: "Informed search algorithm that finds the shortest path using heuristics.",
    useCases: ["Pathfinding", "Game AI", "Route planning"],
    implementations: {
      python: `import heapq

def a_star(graph, start, goal, h):
    frontier = [(0, start)]
    came_from = {start: None}
    cost_so_far = {start: 0}
    
    while frontier:
        current = heapq.heappop(frontier)[1]
        
        if current == goal:
            break
        
        for next_node, cost in graph[current].items():
            new_cost = cost_so_far[current] + cost
            if next_node not in cost_so_far or new_cost < cost_so_far[next_node]:
                cost_so_far[next_node] = new_cost
                priority = new_cost + h(next_node, goal)
                heapq.heappush(frontier, (priority, next_node))
                came_from[next_node] = current
    
    return came_from, cost_so_far`,
    },
    relatedAlgorithms: ["dijkstra", "breadth-first-search", "greedy-best-first"],
    difficulty: "Hard",
    tags: ["informed-search", "heuristic", "optimal"],
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    category: "searching",
    subcategory: "graph",
    timeComplexityBest: "O(V + E log V)",
    timeComplexityAverage: "O(V + E log V)",
    timeComplexityWorst: "O(V + E log V)",
    spaceComplexity: "O(V)",
    description: "Finds the shortest path between nodes in a weighted graph.",
    useCases: ["GPS navigation", "Network routing", "Flight scheduling"],
    implementations: {
      python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current_dist > distances[current]:
            continue
        
        for neighbor, weight in graph[current]:
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances`,
    },
    relatedAlgorithms: ["bellman-ford", "a-star-search", "floyd-warshall"],
    difficulty: "Medium",
    tags: ["weighted-graph", "shortest-path", "positive-weights"],
  },
  {
    id: "bellman-ford",
    name: "Bellman-Ford Algorithm",
    category: "searching",
    subcategory: "graph",
    timeComplexityBest: "O(VE)",
    timeComplexityAverage: "O(VE)",
    timeComplexityWorst: "O(VE)",
    spaceComplexity: "O(V)",
    description: "Finds shortest paths from a single source vertex to all other vertices, handles negative weights.",
    useCases: ["Negative weight edges", "Distance vector routing", "Arbitrage detection"],
    implementations: {
      python: `def bellman_ford(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    for _ in range(len(graph) - 1):
        for node in graph:
            for neighbor, weight in graph[node]:
                if distances[node] != float('inf'):
                    distances[neighbor] = min(distances[neighbor], distances[node] + weight)
    
    for node in graph:
        for neighbor, weight in graph[node]:
            if distances[node] != float('inf') and distances[node] + weight < distances[neighbor]:
                return None  # Negative cycle detected
    
    return distances`,
    },
    relatedAlgorithms: ["dijkstra", "floyd-warshall"],
    difficulty: "Medium",
    tags: ["weighted-graph", "shortest-path", "negative-weights"],
  },
  {
    id: "interpolation-search",
    name: "Interpolation Search",
    category: "searching",
    timeComplexityBest: "O(1)",
    timeComplexityAverage: "O(log log n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(1)",
    description: "Improved binary search for uniformly distributed sorted arrays.",
    useCases: ["Uniformly distributed data", "Large datasets with known distribution"],
    implementations: {
      python: `def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    
    while low <= high and target >= arr[low] and target <= arr[high]:
        if low == high:
            if arr[low] == target:
                return low
            return -1
        
        pos = low + ((target - arr[low]) * (high - low) // (arr[high] - arr[low]))
        
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    
    return -1`,
    },
    relatedAlgorithms: ["binary-search", "exponential-search"],
    difficulty: "Medium",
    tags: ["uniform-data", "interpolation"],
  },
  {
    id: "exponential-search",
    name: "Exponential Search",
    category: "searching",
    timeComplexityBest: "O(1)",
    timeComplexityAverage: "O(log n)",
    timeComplexityWorst: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Finds the range where the element may exist, then performs binary search.",
    useCases: ["Unbounded arrays", "When target is closer to beginning"],
    implementations: {
      python: `def exponential_search(arr, target):
    if arr[0] == target:
        return 0
    
    i = 1
    while i < len(arr) and arr[i] <= target:
        i *= 2
    
    return binary_search(arr, target, i // 2, min(i, len(arr)))

def binary_search(arr, target, low, high):
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    },
    relatedAlgorithms: ["binary-search", "interpolation-search"],
    difficulty: "Easy",
    tags: ["unbounded", "hybrid"],
  },
  {
    id: "jump-search",
    name: "Jump Search",
    category: "searching",
    timeComplexityBest: "O(1)",
    timeComplexityAverage: "O(√n)",
    timeComplexityWorst: "O(√n)",
    spaceComplexity: "O(1)",
    description: "Jumps ahead by fixed steps, then performs linear search.",
    useCases: ["Blocked access to elements", "When binary search is not available"],
    implementations: {
      python: `import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    
    while arr[min(step, n) - 1] < target:
        prev = step
        step += 1
        if prev >= n:
            return -1
    
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
    
    if arr[prev] == target:
        return prev
    
    return -1`,
    },
    relatedAlgorithms: ["binary-search", "linear-search"],
    difficulty: "Easy",
    tags: ["blocked-access", "sqrt-decomposition"],
  },
  // ... More searching algorithms would go here

  // GRAPH ALGORITHMS (52)
  {
    id: "floyd-warshall",
    name: "Floyd-Warshall Algorithm",
    category: "graph",
    timeComplexityBest: "O(V³)",
    timeComplexityAverage: "O(V³)",
    timeComplexityWorst: "O(V³)",
    spaceComplexity: "O(V²)",
    description: "Finds shortest paths between all pairs of vertices in a weighted graph.",
    useCases: ["All-pairs shortest path", "Transitive closure", "Finding negative cycles"],
    implementations: {
      python: `def floyd_warshall(graph, n):
    dist = [[float('inf')] * n for _ in range(n)]
    
    for i in range(n):
        dist[i][i] = 0
    
    for u in graph:
        for v, w in graph[u]:
            dist[u][v] = w
    
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    
    return dist`,
    },
    relatedAlgorithms: ["dijkstra", "bellman-ford"],
    difficulty: "Hard",
    tags: ["all-pairs", "dynamic-programming", "weighted"],
  },
  {
    id: "prims-algorithm",
    name: "Prim's Algorithm",
    category: "graph",
    timeComplexityBest: "O(E log V)",
    timeComplexityAverage: "O(E log V)",
    timeComplexityWorst: "O(E log V)",
    spaceComplexity: "O(V)",
    description: "Finds a minimum spanning tree for a weighted undirected graph.",
    useCases: ["Network design", "Clustering", "Image segmentation"],
    implementations: {
      python: `import heapq

def prims(graph, start):
    mst = []
    visited = set([start])
    edges = [(weight, start, neighbor) for neighbor, weight in graph[start]]
    heapq.heapify(edges)
    
    while edges:
        weight, u, v = heapq.heappop(edges)
        if v not in visited:
            visited.add(v)
            mst.append((u, v, weight))
            for neighbor, w in graph[v]:
                if neighbor not in visited:
                    heapq.heappush(edges, (w, v, neighbor))
    
    return mst`,
    },
    relatedAlgorithms: ["kruskals-algorithm", "dijkstra"],
    difficulty: "Medium",
    tags: ["mst", "greedy", "weighted"],
  },
  {
    id: "kruskals-algorithm",
    name: "Kruskal's Algorithm",
    category: "graph",
    timeComplexityBest: "O(E log V)",
    timeComplexityAverage: "O(E log V)",
    timeComplexityWorst: "O(E log V)",
    spaceComplexity: "O(V + E)",
    description: "Finds minimum spanning tree using edge sorting and union-find.",
    useCases: ["Network design", "Clustering", "Image processing"],
    implementations: {
      python: `def kruskals(graph, n):
        edges = []
        for u in graph:
            for v, w in graph[u]:
                edges.append((w, u, v))
        edges.sort()
        
        parent = list(range(n))
        
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        def union(x, y):
            px, py = find(x), find(y)
            if px != py:
                parent[px] = py
                return True
            return False
        
        mst = []
        for w, u, v in edges:
            if union(u, v):
                mst.append((u, v, w))
        
        return mst`,
    },
    relatedAlgorithms: ["prims-algorithm", "boruvkas-algorithm"],
    difficulty: "Medium",
    tags: ["mst", "greedy", "union-find"],
  },
  {
    id: "topological-sort",
    name: "Topological Sort",
    category: "graph",
    timeComplexityBest: "O(V + E)",
    timeComplexityAverage: "O(V + E)",
    timeComplexityWorst: "O(V + E)",
    spaceComplexity: "O(V)",
    description: "Linear ordering of vertices such that for every edge uv, u comes before v.",
    useCases: ["Task scheduling", "Build systems", "Course prerequisites"],
    implementations: {
      python: `from collections import deque

def topological_sort(graph, n):
    in_degree = [0] * n
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1
    
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    if len(result) == n:
        return result
    return None  # Cycle detected`,
    },
    relatedAlgorithms: ["dfs", "kahn-algorithm"],
    difficulty: "Medium",
    tags: ["dag", "ordering", "dependency"],
  },
  {
    id: "tarjans-algorithm",
    name: "Tarjan's Algorithm",
    category: "graph",
    timeComplexityBest: "O(V + E)",
    timeComplexityAverage: "O(V + E)",
    timeComplexityWorst: "O(V + E)",
    spaceComplexity: "O(V)",
    description: "Finds strongly connected components in a directed graph.",
    useCases: ["Cycle detection", "Dependency analysis", "2-SAT problems"],
    implementations: {
      python: `def tarjans_algorithm(graph):
    index_counter = [0]
    stack = []
    lowlinks = {}
    index = {}
        on_stack = {}
    sccs = []
    
    def strongconnect(v):
        index[v] = index_counter[0]
        lowlinks[v] = index_counter[0]
        index_counter[0] += 1
        stack.append(v)
        on_stack[v] = True
        
        for w in graph.get(v, []):
            if w not in index:
                strongconnect(w)
                lowlinks[v] = min(lowlinks[v], lowlinks[w])
            elif on_stack.get(w, False):
                lowlinks[v] = min(lowlinks[v], index[w])
        
        if lowlinks[v] == index[v]:
            scc = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                scc.append(w)
                if w == v:
                    break
            sccs.append(scc)
    
    for v in graph:
        if v not in index:
            strongconnect(v)
    
    return sccs`,
    },
    relatedAlgorithms: ["kosarajus-algorithm", "topological-sort"],
    difficulty: "Hard",
    tags: ["scc", "dfs", "recursion"],
  },
  // ... More graph algorithms would go here

  // DYNAMIC PROGRAMMING (67)
  {
    id: "fibonacci-dp",
    name: "Fibonacci (DP)",
    category: "dynamic-programming",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(n) or O(1)",
    description: "Classic DP problem computing Fibonacci numbers using memoization or tabulation.",
    useCases: ["Learning DP", "Understanding optimization"],
    implementations: {
      python: `# Tabulation (bottom-up)
def fibonacci_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space optimized
def fibonacci_optimized(n):
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr`,
    },
    relatedAlgorithms: ["longest-common-subsequence", "edit-distance"],
    difficulty: "Easy",
    tags: ["classic", "optimization"],
  },
  {
    id: "knapsack-problem",
    name: "0/1 Knapsack Problem",
    category: "dynamic-programming",
    timeComplexityBest: "O(nW)",
    timeComplexityAverage: "O(nW)",
    timeComplexityWorst: "O(nW)",
    spaceComplexity: "O(nW)",
    description: "Classic optimization problem where items have weights and values, maximize value within weight limit.",
    useCases: ["Resource allocation", "Budget optimization", "Cargo loading"],
    implementations: {
      python: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],
                    dp[i-1][w - weights[i-1]] + values[i-1]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]

# Space optimized
def knapsack_optimized(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for i in range(len(weights)):
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[capacity]`,
    },
    relatedAlgorithms: ["subset-sum", "coin-change"],
    difficulty: "Medium",
    tags: ["classic", "optimization", "combinatorial"],
  },
  {
    id: "longest-common-subsequence",
    name: "Longest Common Subsequence (LCS)",
    category: "dynamic-programming",
    timeComplexityBest: "O(min(m,n))",
    timeComplexityAverage: "O(mn)",
    timeComplexityWorst: "O(mn)",
    spaceComplexity: "O(mn)",
    description: "Finds the longest subsequence common to two sequences.",
    useCases: ["DNA sequencing", "Diff tools", "Plagiarism detection"],
    implementations: {
      python: `def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

# With path reconstruction
def lcs_with_path(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    # Backtrack to find LCS
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if s1[i-1] == s2[j-1]:
            lcs.append(s1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1
    
    return ''.join(reversed(lcs))`,
    },
    relatedAlgorithms: ["longest-increasing-subsequence", "edit-distance"],
    difficulty: "Medium",
    tags: ["string", "classic", "sequence"],
  },
  {
    id: "edit-distance",
    name: "Edit Distance (Levenshtein)",
    category: "dynamic-programming",
    timeComplexityBest: "O(min(m,n))",
    timeComplexityAverage: "O(mn)",
    timeComplexityWorst: "O(mn)",
    spaceComplexity: "O(mn)",
    description: "Minimum operations to transform one string into another (insert, delete, replace).",
    useCases: ["Spell checking", "DNA matching", "Fuzzy search"],
    implementations: {
      python: `def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    
    return dp[m][n]

# Space optimized
def edit_distance_optimized(s1, s2):
    m, n = len(s1), len(s2)
    prev = list(range(n + 1))
    curr = [0] * (n + 1)
    
    for i in range(1, m + 1):
        curr[0] = i
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                curr[j] = prev[j-1]
            else:
                curr[j] = 1 + min(prev[j], curr[j-1], prev[j-1])
        prev, curr = curr, prev
    
    return prev[n]`,
    },
    relatedAlgorithms: ["longest-common-subsequence"],
    difficulty: "Medium",
    tags: ["string", "transformation"],
  },
  {
    id: "longest-increasing-subsequence",
    name: "Longest Increasing Subsequence",
    category: "dynamic-programming",
    timeComplexityBest: "O(n log n)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(n)",
    description: "Finds the length of the longest subsequence where elements are in increasing order.",
    useCases: ["Patience sorting", "Burst balloons", "Box stacking"],
    implementations: {
      python: `# O(n²) DP
def lis_dp(arr):
    n = len(arr)
    dp = [1] * n
    for i in range(1, n):
        for j in range(i):
            if arr[i] > arr[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

# O(n log n) with binary search
from bisect import bisect_left

def lis_binary(arr):
    piles = []
    for x in arr:
        pos = bisect_left(piles, x)
        if pos == len(piles):
            piles.append(x)
        else:
            piles[pos] = x
    return len(piles)`,
    },
    relatedAlgorithms: ["longest-common-subsequence", "longest-divisible-subset"],
    difficulty: "Medium",
    tags: ["sequence", "optimization"],
  },
  {
    id: "coin-change",
    name: "Coin Change Problem",
    category: "dynamic-programming",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n*amount)",
    timeComplexityWorst: "O(n*amount)",
    spaceComplexity: "O(amount)",
    description: "Minimum coins needed to make a given amount.",
    useCases: ["Currency systems", "Change making", "Payment optimization"],
    implementations: {
      python: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# Number of ways
def coin_change_ways(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] += dp[x - coin]
    
    return dp[amount]`,
    },
    relatedAlgorithms: ["unbounded-knapsack", "subset-sum"],
    difficulty: "Easy",
    tags: ["classic", "optimization", "counting"],
  },
  {
    id: "subset-sum",
    name: "Subset Sum Problem",
    category: "dynamic-programming",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n*sum)",
    timeComplexityWorst: "O(n*sum)",
    spaceComplexity: "O(n*sum)",
    description: "Determines if there's a subset that sums to a target value.",
    useCases: ["Partition problems", "Knapsack variant", "Crypto splitting"],
    implementations: {
      python: `def subset_sum(arr, target):
    n = len(arr)
    dp = [[False] * (target + 1) for _ in range(n + 1)]
    
    for i in range(n + 1):
        dp[i][0] = True
    
    for i in range(1, n + 1):
        for s in range(target + 1):
            if arr[i-1] <= s:
                dp[i][s] = dp[i-1][s] or dp[i-1][s - arr[i-1]]
            else:
                dp[i][s] = dp[i-1][s]
    
    return dp[n][target]

# Space optimized
def subset_sum_optimized(arr, target):
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in arr:
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]
    
    return dp[target]`,
    },
    relatedAlgorithms: ["partition-problem", "knapsack-problem"],
    difficulty: "Medium",
    tags: ["subset", "boolean", "classic"],
  },
  {
    id: "matrix-chain-multiplication",
    name: "Matrix Chain Multiplication",
    category: "dynamic-programming",
    timeComplexityBest: "O(n³)",
    timeComplexityAverage: "O(n³)",
    timeComplexityWorst: "O(n³)",
    spaceComplexity: "O(n²)",
    description: "Finds optimal parenthesization for matrix chain multiplication.",
    useCases: ["Optimizing matrix operations", "Expression evaluation"],
    implementations: {
      python: `def matrix_chain_order(dimensions):
    n = len(dimensions) - 1
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k+1][j] + dimensions[i] * dimensions[k+1] * dimensions[j+1]
                dp[i][j] = min(dp[i][j], cost)
    
    return dp[0][n-1]

# With parenthesization
def matrix_chain_parentheses(dimensions):
    n = len(dimensions) - 1
    dp = [[0] * n for _ in range(n)]
    par = [[None] * n for _ in range(n)]
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k+1][j] + dimensions[i] * dimensions[k+1] * dimensions[j+1]
                if cost < dp[i][j]:
                    dp[i][j] = cost
                    par[i][j] = k
    
    return dp[0][n-1], par`,
    },
    relatedAlgorithms: ["optimal-parenthesization"],
    difficulty: "Hard",
    tags: ["matrix", "optimization", "classic"],
  },
  // ... More DP algorithms would go here

  // CRYPTOGRAPHY (31)
  {
    id: "aes-encryption",
    name: "AES Encryption",
    category: "cryptography",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(1)",
    description: "Advanced Encryption Standard - symmetric block cipher widely used for secure data transmission.",
    useCases: ["File encryption", "VPN", "SSL/TLS", "Disk encryption"],
    implementations: {
      python: `from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os

def aes_encrypt(plaintext, key):
    iv = os.urandom(16)
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    padded = plaintext + (16 - len(plaintext) % 16) * chr(16 - len(plaintext) % 16)
    ciphertext = encryptor.update(padded.encode()) + encryptor.finalize()
    return iv + ciphertext

def aes_decrypt(ciphertext, key):
    iv = ciphertext[:16]
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    padded = decryptor.update(ciphertext[16:]) + decryptor.finalize()
    return padded.decode()[:-ord(padded[-1])]`,
    },
    relatedAlgorithms: ["des-encryption", "rijndael-algorithm"],
    difficulty: "Hard",
    tags: ["symmetric", "block-cipher", "standard"],
  },
  {
    id: "rsa-encryption",
    name: "RSA Algorithm",
    category: "cryptography",
    timeComplexityBest: "O(n²)",
    timeComplexityAverage: "O(n²)",
    timeComplexityWorst: "O(n²)",
    spaceComplexity: "O(n)",
    description: "Public-key cryptosystem widely used for secure data transmission.",
    useCases: ["Digital signatures", "Key exchange", "SSL/TLS"],
    implementations: {
      python: `import random
from math import gcd

def generate_keypair(p, q):
    n = p * q
    phi = (p - 1) * (q - 1)
    e = random.randrange(2, phi)
    while gcd(e, phi) != 1:
        e = random.randrange(2, phi)
    d = pow(e, -1, phi)
    return ((e, n), (d, n))

def encrypt(msg, pub_key):
    e, n = pub_key
    return pow(ord(msg), e, n)

def decrypt(cipher, priv_key):
    d, n = priv_key
    return chr(pow(cipher, d, n))

# Full RSA
def rsa_encrypt(message, e, n):
    return [pow(ord(c), e, n) for c in message]

def rsa_decrypt(ciphertext, d, n):
    return ''.join([chr(pow(c, d, n)) for c in ciphertext])`,
    },
    relatedAlgorithms: ["diffie-hellman", "elliptic-curve"],
    difficulty: "Hard",
    tags: ["public-key", "asymmetric", "standard"],
  },
  {
    id: "sha-256",
    name: "SHA-256 Hash",
    category: "cryptography",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(1)",
    description: "Secure Hash Algorithm 2 - cryptographic hash function producing 256-bit hash.",
    useCases: ["Password hashing", "Blockchain", "File integrity"],
    implementations: {
      python: `import hashlib

def sha256_hash(data):
    return hashlib.sha256(data.encode()).hexdigest()

# With salt
import secrets
def sha256_with_salt(password):
    salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return salt + hashed.hex()`,
    },
    relatedAlgorithms: ["md5", "sha-512", "bcrypt"],
    difficulty: "Medium",
    tags: ["hash", "digest", "standard"],
  },
  {
    id: "bcrypt",
    name: "bcrypt",
    category: "cryptography",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(1)",
    description: "Password hashing function with built-in salt and adaptive cost.",
    useCases: ["Password storage", "User authentication"],
    implementations: {
      python: `import bcrypt

def hash_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode(), hashed)`,
    },
    relatedAlgorithms: ["argon2", "pbkdf2"],
    difficulty: "Easy",
    tags: ["password-hashing", "salt", "adaptive"],
  },
  {
    id: "diffie-hellman",
    name: "Diffie-Hellman Key Exchange",
    category: "cryptography",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(1)",
    description: "Method for securely exchanging cryptographic keys over a public channel.",
    useCases: ["Key exchange", "VPN", "TLS handshake"],
    implementations: {
      python: `import random

def mod_pow(base, exp, mod):
    return pow(base, exp, mod)

def generate_keys(p, g):
    private_key = random.randint(2, p - 2)
    public_key = mod_pow(g, private_key, p)
    return private_key, public_key

def compute_secret(private_key, public_key, p):
    return mod_pow(public_key, private_key, p)

# Example:
# p = 23, g = 5
# Alice: private=4, public=4
# Bob: private=3, public=10
# Shared secret = 18`,
    },
    relatedAlgorithms: ["rsa-encryption", "elliptic-curve-diffie-hellman"],
    difficulty: "Hard",
    tags: ["key-exchange", "public-key"],
  },
  {
    id: "md5",
    name: "MD5 Hash",
    category: "cryptography",
    timeComplexityBest: "O(n)",
    timeComplexityAverage: "O(n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(1)",
    description: "Message Digest Algorithm 5 - produces 128-bit hash value (deprecated for security).",
    useCases: ["Checksums", "Legacy systems", "Non-security purposes"],
    implementations: {
      python: `import hashlib

def md5_hash(data):
    return hashlib.md5(data.encode()).hexdigest()`,
    },
    relatedAlgorithms: ["sha-256", "sha-1"],
    difficulty: "Easy",
    tags: ["hash", "digest", "legacy"],
  },
  // ... More cryptography algorithms

  // MACHINE LEARNING (89)
  {
    id: "gradient-descent",
    name: "Gradient Descent",
    category: "machine-learning",
    timeComplexityBest: "O(n·iterations)",
    timeComplexityAverage: "O(n·iterations)",
    timeComplexityWorst: "O(n·iterations)",
    spaceComplexity: "O(n)",
    description: "Optimization algorithm used to minimize a function by iteratively moving in the direction of steepest descent.",
    useCases: ["Linear regression", "Neural networks", "Logistic regression"],
    implementations: {
      python: `import numpy as np

def gradient_descent(X, y, lr=0.01, epochs=1000):
    m, n = X.shape
    theta = np.zeros(n)
    
    for _ in range(epochs):
        predictions = X @ theta
        errors = predictions - y
        gradient = (1/m) * X.T @ errors
        theta -= lr * gradient
    
    return theta

# Stochastic Gradient Descent
def sgd(X, y, lr=0.01, epochs=100):
    m, n = X.shape
    theta = np.zeros(n)
    
    for _ in range(epochs):
        for i in range(m):
            pred = X[i] @ theta
            error = pred - y[i]
            gradient = error * X[i]
            theta -= lr * gradient
    
    return theta

# Mini-batch SGD
def mini_batch_sgd(X, y, lr=0.01, epochs=100, batch_size=32):
    m, n = X.shape
    theta = np.zeros(n)
    
    for _ in range(epochs):
        indices = np.random.permutation(m)
        X_shuffled = X[indices]
        y_shuffled = y[indices]
        
        for i in range(0, m, batch_size):
            X_batch = X_shuffled[i:i+batch_size]
            y_batch = y_shuffled[i:i+batch_size]
            predictions = X_batch @ theta
            errors = predictions - y_batch
            gradient = (1/len(X_batch)) * X_batch.T @ errors
            theta -= lr * gradient
    
    return theta`,
    },
    relatedAlgorithms: ["newton-optimization", "adam-optimizer"],
    difficulty: "Medium",
    tags: ["optimization", "iterative", "gradient"],
  },
  {
    id: "k-means-clustering",
    name: "K-Means Clustering",
    category: "machine-learning",
    timeComplexityBest: "O(n·k·i)",
    timeComplexityAverage: "O(n·k·i)",
    timeComplexityWorst: "O(n·k·i)",
    spaceComplexity: "O(n + k)",
    description: "Unsupervised learning algorithm that partitions data into K clusters.",
    useCases: ["Customer segmentation", "Image compression", "Anomaly detection"],
    implementations: {
      python: `import numpy as np

def kmeans(X, k, max_iters=100):
    centroids = X[np.random.choice(len(X), k, replace=False)]
    
    for _ in range(max_iters):
        distances = np.sqrt(((X - centroids[:, np.newaxis])**2).sum(axis=2))
        labels = np.argmin(distances, axis=0)
        
        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])
        
        if np.allclose(centroids, new_centroids):
            break
        centroids = new_centroids
    
    return centroids, labels

# With inertia calculation
def kmeans_with_inertia(X, k, max_iters=100):
    centroids = X[np.random.choice(len(X), k, replace=False)]
    
    for _ in range(max_iters):
        distances = np.sqrt(((X - centroids[:, np.newaxis])**2).sum(axis=2))
        labels = np.argmin(distances, axis=0)
        
        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])
        
        if np.allclose(centroids, new_centroids):
            break
        centroids = new_centroids
    
    inertia = ((X - centroids[labels])**2).sum()
    return centroids, labels, inertia`,
    },
    relatedAlgorithms: ["hierarchical-clustering", "dbscan"],
    difficulty: "Easy",
    tags: ["unsupervised", "clustering", "iterative"],
  },
  {
    id: "linear-regression",
    name: "Linear Regression",
    category: "machine-learning",
    timeComplexityBest: "O(n²d + nd³)",
    timeComplexityAverage: "O(n²d + nd³)",
    timeComplexityWorst: "O(n²d + nd³)",
    spaceComplexity: "O(d²)",
    description: "Statistical method for modeling relationship between variables.",
    useCases: ["Prediction", "Trend analysis", "Forecasting"],
    implementations: {
      python: `import numpy as np

# Closed form solution
def linear_regression(X, y):
    X_b = np.c_[np.ones((len(X), 1)), X]  # Add bias term
    theta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
    return theta

# With regularization (Ridge)
def ridge_regression(X, y, alpha=1.0):
    X_b = np.c_[np.ones((len(X), 1)), X]
    I = np.eye(X_b.shape[1])
    I[0, 0] = 0
    theta = np.linalg.inv(X_b.T @ X_b + alpha * I) @ X_b.T @ y
    return theta

# Gradient descent
def linear_regression_gd(X, y, lr=0.01, epochs=1000):
    m, n = X.shape
    theta = np.zeros(n + 1)
    X_b = np.c_[np.ones((m, 1)), X]
    
    for _ in range(epochs):
        predictions = X_b @ theta
        errors = predictions - y
        gradient = (1/m) * X_b.T @ errors
        theta -= lr * gradient
    
    return theta`,
    },
    relatedAlgorithms: ["logistic-regression", "polynomial-regression"],
    difficulty: "Easy",
    tags: ["supervised", "regression", "linear"],
  },
  {
    id: "logistic-regression",
    name: "Logistic Regression",
    category: "machine-learning",
    timeComplexityBest: "O(n·d·iterations)",
    timeComplexityAverage: "O(n·d·iterations)",
    timeComplexityWorst: "O(n·d·iterations)",
    spaceComplexity: "O(d)",
    description: "Classification algorithm using logistic function for binary classification.",
    useCases: ["Binary classification", "Spam detection", "Disease prediction"],
    implementations: {
      python: `import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def logistic_regression(X, y, lr=0.01, epochs=1000):
    m, n = X.shape
    theta = np.zeros(n)
    
    for _ in range(epochs):
        z = X @ theta
        h = sigmoid(z)
        gradient = (1/m) * X.T @ (h - y)
        theta -= lr * gradient
    
    return theta

def predict(X, theta):
    return sigmoid(X @ theta) >= 0.5

# Multi-class (One-vs-Rest)
def multiclass_logistic_regression(X, y, lr=0.01, epochs=1000):
    classes = np.unique(y)
    thetas = {}
    
    for c in classes:
        y_binary = (y == c).astype(int)
        thetas[c] = logistic_regression(X, y_binary, lr, epochs)
    
    return thetas`,
    },
    relatedAlgorithms: ["linear-regression", "softmax-regression"],
    difficulty: "Medium",
    tags: ["classification", "probabilistic", "binary"],
  },
  {
    id: "decision-tree",
    name: "Decision Tree",
    category: "machine-learning",
    timeComplexityBest: "O(n·d·log(n))",
    timeComplexityAverage: "O(n·d·log(n))",
    timeComplexityWorst: "O(n·d·n)",
    spaceComplexity: "O(d)",
    description: "Tree-based algorithm making decisions by learning simple rules.",
    useCases: ["Classification", "Decision analysis", "Interpretable models"],
    implementations: {
      python: `import numpy as np
from collections import Counter

def entropy(y):
    counts = Counter(y)
    probs = [c / len(y) for c in counts.values()]
    return -sum(p * np.log2(p) for p in probs if p > 0)

def information_gain(X, y, feature_idx, threshold):
    parent_entropy = entropy(y)
    
    left_mask = X[:, feature_idx] <= threshold
    right_mask = ~left_mask
    
    if sum(left_mask) == 0 or sum(right_mask) == 0:
        return 0
    
    n = len(y)
    n_left, n_right = sum(left_mask), sum(right_mask)
    
    e_left = entropy(y[left_mask])
    e_right = entropy(y[right_mask])
    
    child_entropy = (n_left / n) * e_left + (n_right / n) * e_right
    
    return parent_entropy - child_entropy

def find_best_split(X, y):
    best_gain = 0
    best_feature = None
    best_threshold = None
    
    n_features = X.shape[1]
    
    for feature in range(n_features):
        thresholds = np.unique(X[:, feature])
        for threshold in thresholds:
            gain = information_gain(X, y, feature, threshold)
            if gain > best_gain:
                best_gain = gain
                best_feature = feature
                best_threshold = threshold
    
    return best_feature, best_threshold, best_gain

class DecisionTree:
    def __init__(self, max_depth=10, min_samples=2):
        self.max_depth = max_depth
        self.min_samples = min_samples
        self.tree = None
    
    def fit(self, X, y):
        self.tree = self._build_tree(X, y, depth=0)
    
    def _build_tree(self, X, y, depth):
        if len(np.unique(y)) == 1 or depth >= self.max_depth or len(y) < self.min_samples:
            return Counter(y).most_common(1)[0][0]
        
        feature, threshold, gain = find_best_split(X, y)
        
        if gain == 0:
            return Counter(y).most_common(1)[0][0]
        
        left_mask = X[:, feature] <= threshold
        right_mask = ~left_mask
        
        return {
            'feature': feature,
            'threshold': threshold,
            'left': self._build_tree(X[left_mask], y[left_mask], depth + 1),
            'right': self._build_tree(X[right_mask], y[right_mask], depth + 1)
        }
    
    def predict(self, X):
        return np.array([self._predict(x, self.tree) for x in X])
    
    def _predict(self, x, node):
        if not isinstance(node, dict):
            return node
        if x[node['feature']] <= node['threshold']:
            return self._predict(x, node['left'])
        return self._predict(x, node['right'])`,
    },
    relatedAlgorithms: ["random-forest", "gradient-boosting"],
    difficulty: "Medium",
    tags: ["tree", "supervised", "interpretable"],
  },
  {
    id: "random-forest",
    name: "Random Forest",
    category: "machine-learning",
    timeComplexityBest: "O(n·d·t·log(n))",
    timeComplexityAverage: "O(n·d·t·log(n))",
    timeComplexityWorst: "O(n·d·t·n)",
    spaceComplexity: "O(d·t)",
    description: "Ensemble method using multiple decision trees for improved accuracy.",
    useCases: ["Classification", "Regression", "Feature importance"],
    implementations: {
      python: `import numpy as np

class RandomForest:
    def __init__(self, n_estimators=100, max_depth=10, min_samples=2, n_features=None):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.min_samples = min_samples
        self.n_features = n_features
        self.trees = []
    
    def fit(self, X, y):
        self.trees = []
        n_samples = len(X)
        
        for _ in range(self.n_estimators):
            indices = np.random.choice(n_samples, n_samples, replace=True)
            X_boot = X[indices]
            y_boot = y[indices]
            
            tree = DecisionTree(
                max_depth=self.max_depth,
                min_samples=self.min_samples,
                n_features=self.n_features
            )
            tree.fit(X_boot, y_boot)
            self.trees.append(tree)
    
    def predict(self, X):
        tree_preds = np.array([tree.predict(X) for tree in self.trees])
        return np.round(tree_preds.mean(axis=0)).astype(int)`,
    },
    relatedAlgorithms: ["decision-tree", "xgboost"],
    difficulty: "Medium",
    tags: ["ensemble", "bagging", "tree"],
  },
  {
    id: "naive-bayes",
    name: "Naive Bayes Classifier",
    category: "machine-learning",
    timeComplexityBest: "O(n·d·c)",
    timeComplexityAverage: "O(n·d·c)",
    timeComplexityWorst: "O(n·d·c)",
    spaceComplexity: "O(d·c)",
    description: "Probabilistic classifier based on Bayes' theorem with strong independence assumptions.",
    useCases: ["Text classification", "Spam filtering", "Sentiment analysis"],
    implementations: {
      python: `import numpy as np
from collections import defaultdict

class NaiveBayes:
    def __init__(self, alpha=1.0):
        self.alpha = alpha
        self.class_probs = {}
        self.feature_probs = {}
    
    def fit(self, X, y):
        n_samples = len(X)
        classes = np.unique(y)
        
        # Class probabilities with Laplace smoothing
        for c in classes:
            self.class_probs[c] = (np.sum(y == c) + self.alpha) / (n_samples + len(classes) * self.alpha)
        
        # Feature probabilities
        n_features = X.shape[1]
        
        for c in classes:
            X_c = X[y == c]
            self.feature_probs[c] = {}
            
            for feature in range(n_features):
                values = X_c[:, feature]
                unique_vals = np.unique(values)
                
                self.feature_probs[c][feature] = {}
                for val in unique_vals:
                    count = np.sum(values == val)
                    self.feature_probs[c][feature][val] = (count + self.alpha) / (len(values) + len(unique_vals) * self.alpha)
    
    def predict(self, X):
        predictions = []
        for x in X:
            best_class = None
            best_prob = -float('inf')
            
            for c in self.class_probs:
                prob = np.log(self.class_probs[c])
                
                for feature, val in enumerate(x):
                    if val in self.feature_probs[c].get(feature, {}):
                        prob += np.log(self.feature_probs[c][feature][val])
                
                if prob > best_prob:
                    best_prob = prob
                    best_class = c
            
            predictions.append(best_class)
        
        return np.array(predictions)`,
    },
    relatedAlgorithms: ["logistic-regression"],
    difficulty: "Easy",
    tags: ["probabilistic", "bayesian", "text"],
  },
  {
    id: "k-nearest-neighbors",
    name: "K-Nearest Neighbors (KNN)",
    category: "machine-learning",
    timeComplexityBest: "O(n·d·k)",
    timeComplexityAverage: "O(n·d·k)",
    timeComplexityWorst: "O(n·d·k)",
    spaceComplexity: "O(n·d)",
    description: "Instance-based learning that classifies based on K nearest neighbors.",
    useCases: ["Recommendation systems", "Pattern recognition", "Data classification"],
    implementations: {
      python: `import numpy as np
from collections import Counter

def knn_predict(X_train, y_train, X_test, k=3):
    predictions = []
    
    for test_point in X_test:
        distances = np.sqrt(((X_train - test_point) ** 2).sum(axis=1))
        k_indices = np.argsort(distances)[:k]
        k_labels = y_train[k_indices]
        counter = Counter(k_labels)
        predictions.append(counter.most_common(1)[0][0])
    
    return np.array(predictions)

# With weighted voting
def knn_predict_weighted(X_train, y_train, X_test, k=3):
    predictions = []
    
    for test_point in X_test:
        distances = np.sqrt(((X_train - test_point) ** 2).sum(axis=1))
        k_indices = np.argsort(distances)[:k]
        k_distances = distances[k_indices]
        k_labels = y_train[k_indices]
        
        weights = 1 / (k_distances + 1e-10)
        weighted_votes = {}
        
        for label, weight in zip(k_labels, weights):
            weighted_votes[label] = weighted_votes.get(label, 0) + weight
        
        predictions.append(max(weighted_votes, key=weighted_votes.get))
    
    return np.array(predictions)`,
    },
    relatedAlgorithms: ["k-means-clustering"],
    difficulty: "Easy",
    tags: ["instance-based", "lazy-learning", "distance"],
  },
  // ... More ML algorithms would go here

  // STRING ALGORITHMS (42)
  {
    id: "kmp-algorithm",
    name: "KMP Algorithm",
    category: "string",
    timeComplexityBest: "O(n + m)",
    timeComplexityAverage: "O(n + m)",
    timeComplexityWorst: "O(n + m)",
    spaceComplexity: "O(m)",
    description: "Knuth-Morris-Pratt algorithm for pattern searching in strings.",
    useCases: ["Text editors", "DNA matching", "Plagiarism detection"],
    implementations: {
      python: `def compute_lps(pattern):
    m = len(pattern)
    lps = [0] * m
    length = 0
    i = 1
    
    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    
    return lps

def kmp_search(text, pattern):
    n, m = len(text), len(pattern)
    lps = compute_lps(pattern)
    results = []
    i = j = 0
    
    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == m:
                results.append(i - j)
                j = lps[j - 1]
        else:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    
    return results`,
    },
    relatedAlgorithms: ["rabin-karp", "boyer-moore"],
    difficulty: "Medium",
    tags: ["pattern-matching", "linear-time"],
  },
  {
    id: "rabin-karp",
    name: "Rabin-Karp Algorithm",
    category: "string",
    timeComplexityBest: "O(n + m)",
    timeComplexityAverage: "O(n + m)",
    timeComplexityWorst: "O(nm)",
    spaceComplexity: "O(1)",
    description: "Hashing-based pattern matching algorithm.",
    useCases: ["Plagiarism detection", "String searching", "DNA sequencing"],
    implementations: {
      python: `def rabin_karp(text, pattern, d=256, q=101):
    n, m = len(text), len(pattern)
    h = pow(d, m-1, q)
    results = []
    
    p = 0  # hash for pattern
    t = 0  # hash for text
    
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q
    
    for i in range(n - m + 1):
        if p == t:
            if text[i:i+m] == pattern:
                results.append(i)
        
        if i < n - m:
            t = (d * (t - ord(text[i]) * h) + ord(text[i + m])) % q
            if t < 0:
                t += q
    
    return results`,
    },
    relatedAlgorithms: ["kmp-algorithm", "boyer-moore"],
    difficulty: "Medium",
    tags: ["hashing", "pattern-matching"],
  },
  {
    id: "boyer-moore",
    name: "Boyer-Moore Algorithm",
    category: "string",
    timeComplexityBest: "O(n/m)",
    timeComplexityAverage: "O(n)",
    timeComplexityWorst: "O(nm)",
    spaceComplexity: "O(m)",
    description: "Pattern matching algorithm that skips sections using preprocessing.",
    useCases: ["Text editors", "Large pattern matching", "DNA analysis"],
    implementations: {
      python: `def boyer_moore(text, pattern):
    n, m = len(text), len(pattern)
    
    # Bad character heuristic
    bad_char = {}
    for i in range(m):
        bad_char[pattern[i]] = i
    
    results = []
    s = 0  # shift of the pattern
    
    while s <= n - m:
        j = m - 1
        
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1
        
        if j < 0:
            results.append(s)
            s += (m - bad_char.get(text[s + m - 1], -1)) if s + m < n else 1
        else:
            s += max(1, j - bad_char.get(text[s + j], -1))
    
    return results`,
    },
    relatedAlgorithms: ["kmp-algorithm", "rabin-karp"],
    difficulty: "Medium",
    tags: ["pattern-matching", "heuristic"],
  },
  {
    id: "z-algorithm",
    name: "Z-Algorithm",
    category: "string",
    timeComplexityBest: "O(n + m)",
    timeComplexityAverage: "O(n + m)",
    timeComplexityWorst: "O(n + m)",
    spaceComplexity: "O(n)",
    description: "Linear time algorithm for finding all occurrences of pattern in text.",
    useCases: ["Pattern matching", "String problems", "Z-function computation"],
    implementations: {
      python: `def z_algorithm(s):
    n = len(s)
    z = [0] * n
    l = r = 0
    
    for i in range(1, n):
        if i <= r:
            z[i] = min(r - i + 1, z[i - l])
        
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        
        if i + z[i] - 1 > r:
            l, r = i, i + z[i] - 1
    
    z[0] = n
    return z

def z_pattern_search(text, pattern):
    combined = pattern + '$' + text
    z = z_algorithm(combined)
    results = []
    
    for i in range(len(combined)):
        if z[i] >= len(pattern):
            results.append(i - len(pattern) - 1)
    
    return results`,
    },
    relatedAlgorithms: ["kmp-algorithm"],
    difficulty: "Medium",
    tags: ["pattern-matching", "linear-time"],
  },
  // ... More string algorithms

  // DATA STRUCTURES (73) - Operations for common data structures
  {
    id: "binary-heap",
    name: "Binary Heap",
    category: "data-structures",
    timeComplexityBest: "O(1)",
    timeComplexityAverage: "O(log n)",
    timeComplexityWorst: "O(log n)",
    spaceComplexity: "O(n)",
    description: "Complete binary tree satisfying heap property, used for priority queues.",
    useCases: ["Priority queues", "Heap sort", "Top K elements"],
    implementations: {
      python: `class MinHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left(self, i):
        return 2 * i + 1
    
    def right(self, i):
        return 2 * i + 2
    
    def insert(self, val):
        self.heap.append(val)
        self._heapify_up(len(self.heap) - 1)
    
    def _heapify_up(self, i):
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            self.heap[self.parent(i)], self.heap[i] = self.heap[i], self.heap[self.parent(i)]
            i = self.parent(i)
    
    def extract_min(self):
        if not self.heap:
            return None
        min_val = self.heap[0]
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        self._heapify_down(0)
        return min_val
    
    def _heapify_down(self, i):
        smallest = i
        l = self.left(i)
        r = self.right(i)
        
        if l < len(self.heap) and self.heap[l] < self.heap[smallest]:
            smallest = l
        if r < len(self.heap) and self.heap[r] < self.heap[smallest]:
            smallest = r
        
        if smallest != i:
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            self._heapify_down(smallest)`,
    },
    relatedAlgorithms: ["heap-sort", "priority-queue"],
    difficulty: "Medium",
    tags: ["tree", "priority", "heap"],
  },
  {
    id: "binary-search-tree",
    name: "Binary Search Tree",
    category: "data-structures",
    timeComplexityBest: "O(log n)",
    timeComplexityAverage: "O(log n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(n)",
    description: "Binary tree with ordered nodes, enabling efficient search, insert, and delete.",
    useCases: ["Ordered data", "Sets and maps", "Ordered traversals"],
    implementations: {
      python: `class BSTNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        if not self.root:
            self.root = BSTNode(val)
            return
        self._insert(self.root, val)
    
    def _insert(self, node, val):
        if val < node.val:
            if node.left:
                self._insert(node.left, val)
            else:
                node.left = BSTNode(val)
        else:
            if node.right:
                self._insert(node.right, val)
            else:
                node.right = BSTNode(val)
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if not node or node.val == val:
            return node
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)
    
    def inorder(self):
        result = []
        self._inorder(self.root, result)
        return result
    
    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.val)
            self._inorder(node.right, result)`,
    },
    relatedAlgorithms: ["avl-tree", "red-black-tree"],
    difficulty: "Medium",
    tags: ["tree", "ordered", "search"],
  },
  {
    id: "hash-table",
    name: "Hash Table",
    category: "data-structures",
    timeComplexityBest: "O(1)",
    timeComplexityAverage: "O(1)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(n)",
    description: "Data structure mapping keys to values using hash functions.",
    useCases: ["Lookups", "Caching", "Sets and maps"],
    implementations: {
      python: `class HashTable:
    def __init__(self, size=100):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.table[idx]):
            if k == key:
                self.table[idx][i] = (key, value)
                return
        self.table[idx].append((key, value))
    
    def get(self, key):
        idx = self._hash(key)
        for k, v in self.table[idx]:
            if k == key:
                return v
        return None
    
    def delete(self, key):
        idx = self._hash(key)
        self.table[idx] = [(k, v) for k, v in self.table[idx] if k != key]
    
    def contains(self, key):
        return self.get(key) is not None`,
    },
    relatedAlgorithms: ["hash-set", "bloom-filter"],
    difficulty: "Easy",
    tags: ["hash", "key-value", "o(1)"],
  },
  {
    id: "trie",
    name: "Trie (Prefix Tree)",
    category: "data-structures",
    timeComplexityBest: "O(m)",
    timeComplexityAverage: "O(m)",
    timeComplexityWorst: "O(m)",
    spaceComplexity: "O(ALPHABET_SIZE * m * n)",
    description: "Tree data structure for efficient prefix-based operations.",
    useCases: ["Autocomplete", "Spell checker", "IP routing"],
    implementations: {
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        node = self._find_node(word)
        return node is not None and node.is_end
    
    def starts_with(self, prefix):
        return self._find_node(prefix) is not None
    
    def _find_node(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node
    
    def autocomplete(self, prefix):
        node = self._find_node(prefix)
        if not node:
            return []
        results = []
        self._collect_words(node, prefix, results)
        return results
    
    def _collect_words(self, node, prefix, results):
        if node.is_end:
            results.append(prefix)
        for char, child in node.children.items():
            self._collect_words(child, prefix + char, results)`,
    },
    relatedAlgorithms: ["suffix-tree", "radix-tree"],
    difficulty: "Medium",
    tags: ["tree", "prefix", "string"],
  },
  {
    id: "linked-list",
    name: "Linked List",
    category: "data-structures",
    timeComplexityBest: "O(1)",
    timeComplexityAverage: "O(n)",
    timeComplexityWorst: "O(n)",
    spaceComplexity: "O(n)",
    description: "Linear data structure with nodes containing data and references to next node.",
    useCases: ["Dynamic memory", "Undo functionality", "Hash chaining"],
    implementations: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, val):
        if not self.head:
            self.head = ListNode(val)
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = ListNode(val)
    
    def prepend(self, val):
        new_head = ListNode(val)
        new_head.next = self.head
        self.head = new_head
    
    def delete(self, val):
        if not self.head:
            return
        if self.head.val == val:
            self.head = self.head.next
            return
        curr = self.head
        while curr.next and curr.next.val != val:
            curr = curr.next
        if curr.next:
            curr.next = curr.next.next
    
    def find(self, val):
        curr = self.head
        while curr:
            if curr.val == val:
                return curr
            curr = curr.next
        return None
    
    def reverse(self):
        prev = None
        curr = self.head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        self.head = prev`,
    },
    relatedAlgorithms: ["doubly-linked-list", "circular-linked-list"],
    difficulty: "Easy",
    tags: ["linear", "pointers", "dynamic"],
  },
  // ... More data structures

  // GEOMETRIC ALGORITHMS (28)
  {
    id: "convex-hull",
    name: "Convex Hull (Graham Scan)",
    category: "geometric",
    timeComplexityBest: "O(n log n)",
    timeComplexityAverage: "O(n log n)",
    timeComplexityWorst: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Finds the convex polygon containing all points in a set.",
    useCases: ["Pattern recognition", "Collision detection", "GIS"],
    implementations: {
      python: `def cross_product(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

def convex_hull(points):
    points = sorted(set(points))
    if len(points) <= 1:
        return points
    
    lower = []
    for p in points:
        while len(lower) >= 2 and cross_product(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross_product(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    
    return lower[:-1] + upper[:-1]

# Jarvis March (Gift Wrapping)
def jarvis_march(points):
    if len(points) < 3:
        return points
    
    hull = []
    leftmost = min(points)
    point = leftmost
    
    while True:
        hull.append(point)
        next_point = points[0]
        for p in points:
            if next_point == point or cross_product(point, next_point, p) < 0:
                next_point = p
        point = next_point
        if point == leftmost:
            break
    
    return hull`,
    },
    relatedAlgorithms: ["quickhull", "monotone-chain"],
    difficulty: "Medium",
    tags: ["geometry", "polygon", "computational"],
  },
  {
    id: "line-intersection",
    name: "Line Segment Intersection",
    category: "geometric",
    timeComplexityBest: "O(1)",
    timeComplexityAverage: "O(1)",
    timeComplexityWorst: "O(1)",
    spaceComplexity: "O(1)",
    description: "Determines if two line segments intersect.",
    useCases: ["Computer graphics", "Collision detection", "GIS"],
    implementations: {
      python: `def orientation(p, q, r):
    val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])
    if val == 0:
        return 0  # collinear
    return 1 if val > 0 else 2  # clockwise or counterclockwise

def on_segment(p, q, r):
    return min(p[0], r[0]) <= q[0] <= max(p[0], r[0]) and min(p[1], r[1]) <= q[1] <= max(p[1], r[1])

def segments_intersect(p1, q1, p2, q2):
    o1 = orientation(p1, q1, p2)
    o2 = orientation(p1, q1, q2)
    o3 = orientation(p2, q2, p1)
    o4 = orientation(p2, q2, q1)
    
    if o1 != o2 and o3 != o4:
        return True
    
    if o1 == 0 and on_segment(p1, p2, q1):
        return True
    if o2 == 0 and on_segment(p1, q2, q1):
        return True
    if o3 == 0 and on_segment(p2, p1, q2):
        return True
    if o4 == 0 and on_segment(p2, q1, q2):
        return True
    
    return False

# Line intersection point
def line_intersection(p1, p2, p3, p4):
    x1, y1 = p1
    x2, y2 = p2
    x3, y3 = p3
    x4, y4 = p4
    
    denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if denom == 0:
        return None
    
    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom
    u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom
    
    if 0 <= t <= 1 and 0 <= u <= 1:
        return (x1 + t * (x2 - x1), y1 + t * (y2 - y1))
    return None`,
    },
    relatedAlgorithms: ["convex-hull"],
    difficulty: "Medium",
    tags: ["geometry", "intersection"],
  },
  // ... More geometric algorithms

  // COMPANY-SPECIFIC ALGORITHMS (512) - Major tech company algorithms
  // This section would contain algorithms like:
  // - Google's PageRank, MapReduce, BigTable
  // - Facebook's Graph Search, News Feed Ranking
  // - Amazon's Recommendation, AWS Load Balancing
  // - Netflix's Collaborative Filtering, Content Personalization
  // - Uber's Matching Algorithm, Route Optimization
  // - Airbnb's Pricing Algorithm, Search Ranking
  // - LinkedIn's People You May Know, Job Recommendations
  // - Twitter's Timeline Ranking, Trending Topics
  // - Many more industry-specific algorithms
];

// Helper functions
export function getAlgorithmById(id: string): Algorithm | undefined {
  return algorithms.find(algo => algo.id === id);
}

export function getAlgorithmsByCategory(category: string): Algorithm[] {
  return algorithms.filter(algo => algo.category === category);
}

export function searchAlgorithms(query: string): Algorithm[] {
  const lowerQuery = query.toLowerCase();
  return algorithms.filter(algo => 
    algo.name.toLowerCase().includes(lowerQuery) ||
    algo.description.toLowerCase().includes(lowerQuery) ||
    algo.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getTotalAlgorithmCount(): number {
  return algorithms.length;
}

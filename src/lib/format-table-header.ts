// Function to format table headers (capitalize, replace underscores with spaces, etc.)
const formatTableHeader = (column: string): string => {
  // Replace underscores with spaces and capitalize each word
  return column
    .replace(/_/g, ' ')
    .replace(
      /\w\S*/g,
      word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(),
    )
}

export { formatTableHeader };

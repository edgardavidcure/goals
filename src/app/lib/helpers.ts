export function formatDate(startDate: Date) {
    const formattedDate = new Date(startDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  
    return formattedDate;
  }
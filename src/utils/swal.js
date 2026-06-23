import Swal from 'sweetalert2';

export const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const showToast = (icon, title) => {
  toast.fire({ icon, title });
};

export const confirmDelete = async (text = 'আপনি কি নিশ্চিত যে আপনি এই রেকর্ডটি চিরতরে মুছে ফেলতে চান? এটি আর ফিরিয়ে আনা সম্ভব হবে না।') => {
  const result = await Swal.fire({
    title: 'নিশ্চিত করুন',
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'হ্যাঁ, মুছে ফেলুন',
    cancelButtonText: 'বাতিল করুন',
    reverseButtons: true,
  });
  return result.isConfirmed;
};

export default Swal;
export const CodeCard = ({ fileName, importStatement, comments, codeLines, returnLine }) => {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
        <div className="bg-gray-800 text-white px-4 py-2 flex items-center">
          <div className="flex space-x-2 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="font-mono text-sm">{fileName}</span>
        </div>
        
        <div className="p-5 font-mono text-sm bg-gray-900 text-gray-200 h-64 overflow-y-auto">
          <div className="text-blue-400 mb-2">{importStatement}</div>
          
          {comments.map((comment, index) => (
            <div key={`comment-${index}`} className="text-gray-500 mb-1">{comment}</div>
          ))}
          
          <div className="mt-3">
            {codeLines.map((line, index) => (
              <div key={`code-${index}`} className="text-pink-300 mb-1">{line}</div>
            ))}
          </div>
          
          <div className="mt-3 text-green-400">{returnLine}</div>
        </div>
      </div>
    );
  };